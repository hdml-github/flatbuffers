/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

/* eslint-disable no-case-declarations */

import { Builder } from "flatbuffers";
import {
  FilterClause,
  Filter,
  FilterOpts,
  ExprOpts,
  KeysOpts,
  NamedOpts,
} from "../.fbs/query.FilterClause_generated";
import { FilterTypeEnum } from "../enums";
import {
  TExprOpts,
  TKeysOpts,
  TNamedOpts,
  TFilter,
  TFilterClause,
} from "../types";

/**
 * Filter helper class.
 */
export class FilterHelper {
  public constructor(private _builder: Builder) {}

  public bufferizeFiltersClauses(data: TFilterClause[]): number[] {
    return data.map((c) => this.bufferizeFilterClause(c));
  }

  public bufferizeFilterClause(data: TFilterClause): number {
    const filters_ = this.bufferizeFilters(data.filters);
    const filters = FilterClause.createFiltersVector(
      this._builder,
      filters_,
    );
    const children_ = this.bufferizeFiltersClauses(data.children);
    const children = FilterClause.createChildrenVector(
      this._builder,
      children_,
    );
    FilterClause.startFilterClause(this._builder);
    FilterClause.addType(this._builder, data.type);
    FilterClause.addFilters(this._builder, filters);
    FilterClause.addChildren(this._builder, children);
    return FilterClause.endFilterClause(this._builder);
  }

  public bufferizeFilters(data: TFilter[]): number[] {
    return data.map((f) => this.bufferizeFilter(f));
  }

  public bufferizeFilter(data: TFilter): number {
    let type = FilterOpts.NONE;
    let opts = 0;
    switch (data.type) {
      default:
        break;
      case FilterTypeEnum.Expr:
        type = FilterOpts.ExprOpts;
        opts = this.bufferizeExprOpts(data.options);
        break;
      case FilterTypeEnum.Keys:
        type = FilterOpts.KeysOpts;
        opts = this.bufferizeKeysOpts(data.options);
        break;
      case FilterTypeEnum.Named:
        type = FilterOpts.NamedOpts;
        opts = this.bufferizeNamedOpts(data.options);
        break;
    }
    Filter.startFilter(this._builder);
    Filter.addType(this._builder, data.type);
    Filter.addOptionsType(this._builder, type);
    Filter.addOptions(this._builder, opts);
    return Filter.endFilter(this._builder);
  }

  public bufferizeExprOpts(data: TExprOpts): number {
    const clause = this._builder.createString(data.clause);
    ExprOpts.startExprOpts(this._builder);
    ExprOpts.addClause(this._builder, clause);
    return ExprOpts.endExprOpts(this._builder);
  }

  public bufferizeKeysOpts(data: TKeysOpts): number {
    const left = this._builder.createString(data.left);
    const right = this._builder.createString(data.right);
    KeysOpts.startKeysOpts(this._builder);
    KeysOpts.addLeft(this._builder, left);
    KeysOpts.addRight(this._builder, right);
    return KeysOpts.endKeysOpts(this._builder);
  }

  public bufferizeNamedOpts(data: TNamedOpts): number {
    const field = this._builder.createString(data.field);
    const values_ = data.values.map((v) =>
      this._builder.createString(v),
    );
    const values = NamedOpts.createValuesVector(
      this._builder,
      values_,
    );
    NamedOpts.startNamedOpts(this._builder);
    NamedOpts.addName(this._builder, data.name);
    NamedOpts.addField(this._builder, field);
    NamedOpts.addValues(this._builder, values);
    return NamedOpts.endNamedOpts(this._builder);
  }

  public parseFilterClause(clause: FilterClause): TFilterClause {
    return <TFilterClause>Object.defineProperties(
      {},
      {
        type: { get: () => clause.type() },
        filters: {
          get: () => {
            const filters: TFilter[] = [];
            if (clause.filtersLength() > 0) {
              for (let i = 0; i < clause.filtersLength(); i++) {
                const filter = clause.filters(i, new Filter());
                if (filter) {
                  filters.push(
                    <TFilter>Object.defineProperties(
                      {},
                      {
                        type: { get: () => filter.type() },
                        options: {
                          get: () => this.parseFilterOpts(filter),
                        },
                      },
                    ),
                  );
                }
              }
            }
            return filters;
          },
        },
        children: {
          get: () => {
            const children: TFilterClause[] = [];
            if (clause.childrenLength() > 0) {
              for (let i = 0; i < clause.childrenLength(); i++) {
                const child = clause.children(i, new FilterClause());
                if (child) {
                  children.push(this.parseFilterClause(child));
                }
              }
            }
            return children;
          },
        },
      },
    );
  }

  public parseFilterOpts(
    filter: Filter,
  ): TExprOpts | TKeysOpts | TNamedOpts {
    switch (filter.optionsType()) {
      default:
        throw new Error("Invalid filter options type.");
      case FilterOpts.NONE:
        throw new Error("Invalid filter options type.");
      case FilterOpts.ExprOpts:
        let exprOpts: null | ExprOpts = null;
        const getExprOpts = () => {
          if (!exprOpts) {
            exprOpts = <ExprOpts>filter.options(new ExprOpts());
          }
          return exprOpts;
        };
        return <TExprOpts>Object.defineProperties(
          {},
          {
            clause: { get: () => getExprOpts().clause() },
          },
        );
      case FilterOpts.KeysOpts:
        let keysOpts: null | KeysOpts = null;
        const getKeysOpts = () => {
          if (!keysOpts) {
            keysOpts = <KeysOpts>filter.options(new KeysOpts());
          }
          return keysOpts;
        };
        return <TKeysOpts>Object.defineProperties(
          {},
          {
            left: { get: () => getKeysOpts().left() },
            right: { get: () => getKeysOpts().right() },
          },
        );
      case FilterOpts.NamedOpts:
        let namedOpts: null | NamedOpts = null;
        const getNamedOpts = () => {
          if (!namedOpts) {
            namedOpts = <NamedOpts>filter.options(new NamedOpts());
          }
          return namedOpts;
        };
        return <TNamedOpts>Object.defineProperties(
          {},
          {
            name: { get: () => getNamedOpts().name() },
            field: { get: () => getNamedOpts().field() },
            values: {
              get: () => {
                const v: string[] = [];
                for (
                  let i = 0;
                  i < getNamedOpts().valuesLength();
                  i++
                ) {
                  v.push(getNamedOpts().values(i));
                }
                return v;
              },
            },
          },
        );
    }
  }
}
