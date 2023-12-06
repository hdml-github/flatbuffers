/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TableTypeEnum } from "../enums";
import { TField } from "./TField";

/**
 * An object to define table.
 */
export type TTable = {
  name: string;
  type: TableTypeEnum;
  source: string;
  fields: TField[];
};
