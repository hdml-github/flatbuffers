/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TimeUnitEnum } from "../enums";

/**
 * An object to define time field options.
 */
export type TTimeOpts = {
  nullable: boolean;
  unit: TimeUnitEnum;
};
