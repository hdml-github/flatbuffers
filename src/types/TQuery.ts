/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TModel } from "./TModel";
import { TFrame } from "./TFrame";

/**
 * Query.
 */
export type TQuery = {
  model?: TModel;
  frame?: TFrame;
};
