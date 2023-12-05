/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TimeUnit } from "../enums";

/**
 * An object to define time field options.
 */
export type TTimeOpts = {
  nullable: boolean;
  unit: TimeUnit;
};
