/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TTable } from "./TTable";
import { TJoin } from "./TJoin";

/**
 * An object to define model.
 */
export type TModel = {
  name: string;
  tables: TTable[];
  joins: TJoin[];
};
