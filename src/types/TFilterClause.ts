/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterOperator } from "../enums";
import { TFilter } from "./TFilter";

/**
 * An object to define filters clause.
 */
export type TFilterClause = {
  type: FilterOperator;
  filters: TFilter[];
  children: TFilterClause[];
};
