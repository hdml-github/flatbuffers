/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { DateUnitEnum } from "../enums";

/**
 * An object to define date field options.
 */
export type TDateOpts = {
  nullable: boolean;
  unit: DateUnitEnum;
};
