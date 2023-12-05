/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { AggType } from "../enums";
import { TType } from "./TType";

/**
 * An object to definine field.
 */
export type TField = {
  name: string;
  type?: TType;
  origin?: string;
  clause?: string;
  agg?: AggType;
  asc?: boolean;
  description?: string;
};
