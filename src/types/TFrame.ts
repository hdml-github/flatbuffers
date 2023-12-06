/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TField } from "./TField";
import { TFilterClause } from "./TFilterClause";

/**
 * An object to define frame.
 */
export type TFrame = {
  name: string;
  source: string;
  offset: number;
  limit: number;
  fields: TField[];
  filterBy?: TFilterClause;
  groupBy?: TField[];
  splitBy?: TField[];
  sortBy?: TField[];
  parent?: TFrame;
};
