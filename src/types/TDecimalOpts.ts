/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { DecBitWidth } from "../enums";

/**
 * An object to define decimal field options.
 */
export type TDecimalOpts = {
  nullable: boolean;
  scale: number;
  precision: number;
  bitWidth: DecBitWidth;
};
