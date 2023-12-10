/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TModel } from "./TModel";
import { TFrame } from "./TFrame";

/**
 * HDML markup interface.
 */
export interface IMarkup {
  model?: TModel;
  frame?: TFrame;
}
