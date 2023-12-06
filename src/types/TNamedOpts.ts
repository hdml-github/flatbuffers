/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterNameEnum } from "../enums";

/**
 * An object to define named filter options.
 */
export type TNamedOpts = {
  name: FilterNameEnum;
  field: string;
  values: string[];
};
