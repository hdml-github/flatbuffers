/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterTypeEnum } from "../enums";
import { TExprOpts } from "./TExprOpts";
import { TKeysOpts } from "./TKeysOpts";
import { TNamedOpts } from "./TNamedOpts";

/**
 * An object to define filter.
 */
export type TFilter =
  | {
      type: FilterTypeEnum.Expr;
      options: TExprOpts;
    }
  | {
      type: FilterTypeEnum.Keys;
      options: TKeysOpts;
    }
  | {
      type: FilterTypeEnum.Named;
      options: TNamedOpts;
    };
