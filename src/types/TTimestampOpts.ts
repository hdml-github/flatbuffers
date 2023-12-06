/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TimeUnitEnum } from "../enums";

/**
 * An object to define timestamp field options.
 */
export type TTimestampOpts = {
  nullable: boolean;
  unit: TimeUnitEnum;
};
