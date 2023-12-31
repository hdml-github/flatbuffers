/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { Builder } from "flatbuffers";
import { Join, Model } from "../.fbs/hdml.Model_generated";
import { FilterClause } from "../.fbs/hdml.FilterClause_generated";
import { FilterHelper } from "./FilterHelper";
import { TJoin } from "../types";

/**
 * Join helper class.
 */
export class JoinHelper {
  private _filter: FilterHelper;

  public constructor(private _builder: Builder) {
    this._filter = new FilterHelper(this._builder);
  }

  public bufferizeJoins(data: TJoin[]): number[] {
    return data.map((j) => this.bufferizeJoin(j));
  }

  public bufferizeJoin(data: TJoin): number {
    const left = this._builder.createString(data.left);
    const right = this._builder.createString(data.right);
    const clause = this._filter.bufferizeFilterClause(data.clause);
    Join.startJoin(this._builder);
    Join.addType(this._builder, data.type);
    Join.addLeft(this._builder, left);
    Join.addRight(this._builder, right);
    Join.addClause(this._builder, clause);
    return Join.endJoin(this._builder);
  }

  public parseJoins(model: Model): TJoin[] {
    const joins: TJoin[] = [];
    for (let i = 0; i < model.joinsLength(); i++) {
      let join: null | Join = null;
      let clause: null | FilterClause = null;

      const getJoin = () => {
        if (!join) {
          join = model.joins(i, new Join());
        }
        if (!join) {
          throw new Error("Invalid join.");
        }
        return join;
      };

      const getClause = (join: Join) => {
        if (!clause) {
          clause = join.clause(new FilterClause());
        }
        if (!clause) {
          throw new Error("Invalid filter clause.");
        }
        return clause;
      };

      joins.push(
        <TJoin>Object.defineProperties(
          {},
          {
            type: {
              enumerable: true,
              get: () => getJoin().type(),
            },
            left: {
              enumerable: true,
              get: () => getJoin().left(),
            },
            right: {
              enumerable: true,
              get: () => getJoin().right(),
            },
            clause: {
              enumerable: true,
              get: () =>
                this._filter.parseFilterClause(getClause(getJoin())),
            },
          },
        ),
      );
    }
    return joins;
  }
}
