/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterName } from "../enums";

/**
 * An object to define named filter options.
 */
export type TNamedOpts = {
  name: FilterName;
  field: string;
  values: string[];
};
