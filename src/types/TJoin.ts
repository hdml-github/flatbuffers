/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { JoinType } from "../enums";
import { TFilterClause } from "./TFilterClause";

/**
 * An object to define join.
 */
export type TJoin = {
  type: JoinType;
  left: string;
  right: string;
  clause: TFilterClause;
};
