/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

/* eslint-disable no-case-declarations */

import { Builder } from "flatbuffers";
import {
  Field,
  Type,
  TypeOpts,
  TimestampOpts,
  TimeOpts,
  DateOpts,
  DecimalOpts,
  CommonOpts,
} from "../.fbs/query.Field_generated";
import { DataType } from "../enums";
import {
  TCommonOpts,
  TDecimalOpts,
  TDateOpts,
  TTimeOpts,
  TTimestampOpts,
  TType,
  TField,
} from "../types";

/**
 * Field helper class.
 */
export class FieldHelper {
  public constructor(private _builder: Builder) {}

  public bufferizeFields(data: TField[]): number[] {
    return data.map((f) => this.bufferizeField(f));
  }

  public bufferizeField(data: TField): number {
    const name = this._builder.createString(data.name);
    const origin = data.origin
      ? this._builder.createString(data.origin)
      : false;
    const clause = data.clause
      ? this._builder.createString(data.clause)
      : false;
    const description = data.description
      ? this._builder.createString(data.description)
      : false;
    const type = data.type ? this.bufferizeType(data.type) : false;
    Field.startField(this._builder);
    Field.addName(this._builder, name);
    if (origin) {
      Field.addOrigin(this._builder, origin);
    }
    if (clause) {
      Field.addClause(this._builder, clause);
    }
    if (description) {
      Field.addDescription(this._builder, description);
    }
    if (data.agg) {
      Field.addAgg(this._builder, data.agg);
    }
    if (typeof data.asc === "boolean") {
      Field.addAsc(this._builder, data.asc);
    } else {
      Field.addAsc(this._builder, true);
    }
    if (type) {
      Field.addType(this._builder, type);
    }
    return Field.endField(this._builder);
  }

  public bufferizeType(data: TType): number {
    let opts: number;
    let type: TypeOpts = TypeOpts.NONE;
    switch (data.type) {
      default:
        type = TypeOpts.NONE;
        opts = 0;
        break;
      case DataType.Int8:
      case DataType.Int16:
      case DataType.Int32:
      case DataType.Int64:
      case DataType.Uint8:
      case DataType.Uint16:
      case DataType.Uint32:
      case DataType.Uint64:
      case DataType.Float16:
      case DataType.Float32:
      case DataType.Float64:
      case DataType.Binary:
      case DataType.Utf8:
        type = TypeOpts.CommonOpts;
        opts = this.bufferizeCommonOpts(data.options);
        break;
      case DataType.Decimal:
        type = TypeOpts.DecimalOpts;
        opts = this.bufferizeDecimalOpts(data.options);
        break;
      case DataType.Date:
        type = TypeOpts.DateOpts;
        opts = this.bufferizeDateOpts(data.options);
        break;
      case DataType.Time:
        type = TypeOpts.TimeOpts;
        opts = this.bufferizeTimeOpts(data.options);
        break;
      case DataType.Timestamp:
        type = TypeOpts.TimestampOpts;
        opts = this.bufferizeTimestampOpts(data.options);
        break;
    }
    Type.startType(this._builder);
    Type.addType(this._builder, data.type);
    Type.addOptionsType(this._builder, type);
    Type.addOptions(this._builder, opts);
    return Type.endType(this._builder);
  }

  public bufferizeCommonOpts(data: TCommonOpts): number {
    return CommonOpts.createCommonOpts(this._builder, data.nullable);
  }

  public bufferizeDecimalOpts(data: TDecimalOpts): number {
    return DecimalOpts.createDecimalOpts(
      this._builder,
      data.nullable,
      data.scale,
      data.precision,
      data.bitWidth,
    );
  }

  public bufferizeDateOpts(data: TDateOpts): number {
    return DateOpts.createDateOpts(
      this._builder,
      data.nullable,
      data.unit,
    );
  }

  public bufferizeTimeOpts(data: TTimeOpts): number {
    return TimeOpts.createTimeOpts(
      this._builder,
      data.nullable,
      data.unit,
    );
  }

  public bufferizeTimestampOpts(data: TTimestampOpts): number {
    return TimestampOpts.createTimestampOpts(
      this._builder,
      data.nullable,
      data.unit,
    );
  }

  public parseFields(
    fieldGetter: (index: number, obj?: Field) => Field | null,
    length: number,
  ): TField[] {
    const fields: TField[] = [];
    for (let j = 0; j < length; j++) {
      const field = fieldGetter(j, new Field());
      if (field) {
        fields.push(
          <TField>Object.defineProperties(
            {},
            {
              name: { get: () => field.name() || "" },
              type: {
                get: () => this.parseType(field.type(new Type())),
              },
              origin: { get: () => field.origin() || undefined },
              clause: { get: () => field.clause() || undefined },
              agg: { get: () => field.agg() },
              asc: { get: () => field.asc() },
              description: {
                get: () => field.description() || undefined,
              },
            },
          ),
        );
      }
    }
    return fields;
  }

  public parseType(type: null | Type): TType | undefined {
    if (!type) {
      return;
    }
    let data: TType | undefined = undefined;
    switch (type.optionsType()) {
      case TypeOpts.CommonOpts:
        let comOpts: null | CommonOpts = null;
        const getComOpts = () => {
          if (!comOpts) {
            comOpts = <CommonOpts>type.options(new CommonOpts());
          }
          return comOpts;
        };
        data = <TType>Object.defineProperties(
          {},
          {
            type: {
              get: () =>
                <
                  | DataType.Int8
                  | DataType.Int16
                  | DataType.Int32
                  | DataType.Int64
                  | DataType.Uint8
                  | DataType.Uint16
                  | DataType.Uint32
                  | DataType.Uint64
                  | DataType.Float16
                  | DataType.Float32
                  | DataType.Float64
                  | DataType.Binary
                  | DataType.Utf8
                >type.type(),
            },
            options: {
              get: () => <TCommonOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      get: () => getComOpts().nullable(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case TypeOpts.DecimalOpts:
        let decOpts: null | DecimalOpts = null;
        const getDecOpts = () => {
          if (!decOpts) {
            decOpts = <DecimalOpts>type.options(new DecimalOpts());
          }
          return decOpts;
        };
        data = <TType>Object.defineProperties(
          {},
          {
            type: {
              get: () => <DataType.Decimal>type.type(),
            },
            options: {
              get: () => <TDecimalOpts>Object.defineProperties(
                  {},
                  {
                    nullable: { get: () => getDecOpts().nullable() },
                    scale: { get: () => getDecOpts().scale() },
                    precision: {
                      get: () => getDecOpts().precision(),
                    },
                    bitWidth: { get: () => getDecOpts().bitWidth() },
                  },
                ),
            },
          },
        );
        break;
      case TypeOpts.DateOpts:
        let dateOpts: null | DateOpts = null;
        const getDateOpts = () => {
          if (!dateOpts) {
            dateOpts = <DateOpts>type.options(new DateOpts());
          }
          return dateOpts;
        };
        data = <TType>Object.defineProperties(
          {},
          {
            type: {
              get: () => <DataType.Date>type.type(),
            },
            options: {
              get: () => <TDateOpts>Object.defineProperties(
                  {},
                  {
                    nullable: { get: () => getDateOpts().nullable() },
                    unit: { get: () => getDateOpts().unit() },
                  },
                ),
            },
          },
        );
        break;
      case TypeOpts.TimeOpts:
        let timeOpts: null | TimeOpts = null;
        const getTimeOpts = () => {
          if (!timeOpts) {
            timeOpts = <TimeOpts>type.options(new TimeOpts());
          }
          return timeOpts;
        };
        data = <TType>Object.defineProperties(
          {},
          {
            type: {
              get: () => <DataType.Time>type.type(),
            },
            options: {
              get: () => <TTimeOpts>Object.defineProperties(
                  {},
                  {
                    nullable: { get: () => getTimeOpts().nullable() },
                    unit: { get: () => getTimeOpts().unit() },
                  },
                ),
            },
          },
        );
        break;
      case TypeOpts.TimestampOpts:
        let tsOpts: null | TimestampOpts = null;
        const getTsOpts = () => {
          if (!tsOpts) {
            tsOpts = <TimestampOpts>type.options(new TimestampOpts());
          }
          return tsOpts;
        };
        data = <TType>Object.defineProperties(
          {},
          {
            type: {
              get: () => <DataType.Timestamp>type.type(),
            },
            options: {
              get: () => <TTimestampOpts>Object.defineProperties(
                  {},
                  {
                    nullable: { get: () => getTsOpts().nullable() },
                    unit: { get: () => getTsOpts().unit() },
                  },
                ),
            },
          },
        );
        break;
    }
    return data;
  }
}
