/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { AggTypeEnum } from "../enums";
import { TType } from "./TType";

/**
 * An object to definine field.
 */
export type TField = {
  name: string;
  type?: TType;
  origin?: string;
  clause?: string;
  agg?: AggTypeEnum;
  asc?: boolean;
  description?: string;
};
