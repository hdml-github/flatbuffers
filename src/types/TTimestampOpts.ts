/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TimeUnit } from "../enums";

/**
 * An object to define timestamp field options.
 */
export type TTimestampOpts = {
  nullable: boolean;
  unit: TimeUnit;
};
