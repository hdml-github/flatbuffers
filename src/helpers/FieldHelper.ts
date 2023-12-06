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
import { DataTypeEnum } from "../enums";
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
      case DataTypeEnum.Int8:
      case DataTypeEnum.Int16:
      case DataTypeEnum.Int32:
      case DataTypeEnum.Int64:
      case DataTypeEnum.Uint8:
      case DataTypeEnum.Uint16:
      case DataTypeEnum.Uint32:
      case DataTypeEnum.Uint64:
      case DataTypeEnum.Float16:
      case DataTypeEnum.Float32:
      case DataTypeEnum.Float64:
      case DataTypeEnum.Binary:
      case DataTypeEnum.Utf8:
        type = TypeOpts.CommonOpts;
        opts = this.bufferizeCommonOpts(data.options);
        break;
      case DataTypeEnum.Decimal:
        type = TypeOpts.DecimalOpts;
        opts = this.bufferizeDecimalOpts(data.options);
        break;
      case DataTypeEnum.Date:
        type = TypeOpts.DateOpts;
        opts = this.bufferizeDateOpts(data.options);
        break;
      case DataTypeEnum.Time:
        type = TypeOpts.TimeOpts;
        opts = this.bufferizeTimeOpts(data.options);
        break;
      case DataTypeEnum.Timestamp:
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
              name: {
                enumerable: true,
                get: () => field.name() || "",
              },
              type: {
                enumerable: true,
                get: () => this.parseType(field.type(new Type())),
              },
              origin: {
                enumerable: true,
                get: () => field.origin() || undefined,
              },
              clause: {
                enumerable: true,
                get: () => field.clause() || undefined,
              },
              agg: {
                enumerable: true,
                get: () => field.agg(),
              },
              asc: {
                enumerable: true,
                get: () => field.asc(),
              },
              description: {
                enumerable: true,
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
              enumerable: true,
              get: () =>
                <
                  | DataTypeEnum.Int8
                  | DataTypeEnum.Int16
                  | DataTypeEnum.Int32
                  | DataTypeEnum.Int64
                  | DataTypeEnum.Uint8
                  | DataTypeEnum.Uint16
                  | DataTypeEnum.Uint32
                  | DataTypeEnum.Uint64
                  | DataTypeEnum.Float16
                  | DataTypeEnum.Float32
                  | DataTypeEnum.Float64
                  | DataTypeEnum.Binary
                  | DataTypeEnum.Utf8
                >type.type(),
            },
            options: {
              enumerable: true,
              get: () => <TCommonOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      enumerable: true,
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
              enumerable: true,
              get: () => <DataTypeEnum.Decimal>type.type(),
            },
            options: {
              enumerable: true,
              get: () => <TDecimalOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      enumerable: true,
                      get: () => getDecOpts().nullable(),
                    },
                    scale: {
                      enumerable: true,
                      get: () => getDecOpts().scale(),
                    },
                    precision: {
                      enumerable: true,
                      get: () => getDecOpts().precision(),
                    },
                    bitWidth: {
                      enumerable: true,
                      get: () => getDecOpts().bitWidth(),
                    },
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
              enumerable: true,
              get: () => <DataTypeEnum.Date>type.type(),
            },
            options: {
              enumerable: true,
              get: () => <TDateOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      enumerable: true,
                      get: () => getDateOpts().nullable(),
                    },
                    unit: {
                      enumerable: true,
                      get: () => getDateOpts().unit(),
                    },
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
              enumerable: true,
              get: () => <DataTypeEnum.Time>type.type(),
            },
            options: {
              enumerable: true,
              get: () => <TTimeOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      enumerable: true,
                      get: () => getTimeOpts().nullable(),
                    },
                    unit: {
                      enumerable: true,
                      get: () => getTimeOpts().unit(),
                    },
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
              enumerable: true,
              get: () => <DataTypeEnum.Timestamp>type.type(),
            },
            options: {
              enumerable: true,
              get: () => <TTimestampOpts>Object.defineProperties(
                  {},
                  {
                    nullable: {
                      enumerable: true,
                      get: () => getTsOpts().nullable(),
                    },
                    unit: {
                      enumerable: true,
                      get: () => getTsOpts().unit(),
                    },
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
