/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { JoinTypeEnum } from "../enums";
import { TFilterClause } from "./TFilterClause";

/**
 * An object to define join.
 */
export type TJoin = {
  type: JoinTypeEnum;
  left: string;
  right: string;
  clause: TFilterClause;
};
