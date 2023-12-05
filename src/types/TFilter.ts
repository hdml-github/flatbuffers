/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterType } from "../enums";
import { TExprOpts } from "./TExprOpts";
import { TKeysOpts } from "./TKeysOpts";
import { TNamedOpts } from "./TNamedOpts";

/**
 * An object to define filter.
 */
export type TFilter =
  | {
      type: FilterType.Expr;
      options: TExprOpts;
    }
  | {
      type: FilterType.Keys;
      options: TKeysOpts;
    }
  | {
      type: FilterType.Named;
      options: TNamedOpts;
    };
