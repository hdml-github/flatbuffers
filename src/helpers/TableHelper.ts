/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { Builder } from "flatbuffers";
import { Table, Model } from "../.fbs/hdml.Model_generated";
import { FieldHelper } from "./FieldHelper";
import { TTable } from "../types";

/**
 * Table helper class.
 */
export class TableHelper {
  private _field: FieldHelper;

  public constructor(private _builder: Builder) {
    this._field = new FieldHelper(this._builder);
  }

  public bufferizeTables(data: TTable[]): number[] {
    return data.map((t) => this.bufferizeTable(t));
  }

  public bufferizeTable(data: TTable): number {
    const name = this._builder.createString(data.name);
    const source = this._builder.createString(data.source);
    const offsets = this._field.bufferizeFields(data.fields);
    const fields = Table.createFieldsVector(this._builder, offsets);
    Table.startTable(this._builder);
    Table.addName(this._builder, name);
    Table.addSource(this._builder, source);
    Table.addType(this._builder, data.type);
    Table.addFields(this._builder, fields);
    return Table.endTable(this._builder);
  }

  public parseTables(model: Model): TTable[] {
    const tables: TTable[] = [];
    for (let i = 0; i < model.tablesLength(); i++) {
      const table = model.tables(i, new Table());
      if (table) {
        tables.push(
          <TTable>Object.defineProperties(
            {},
            {
              name: {
                enumerable: true,
                get: () => table.name() || "",
              },
              type: {
                enumerable: true,
                get: () => table.type(),
              },
              source: {
                enumerable: true,
                get: () => table.source() || "",
              },
              fields: {
                enumerable: true,
                get: () =>
                  this._field.parseFields(
                    table.fields.bind(table),
                    table.fieldsLength(),
                  ),
              },
            },
          ),
        );
      }
    }
    return tables;
  }
}
