/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { TCommonOpts } from "./TCommonOpts";
import { TDecimalOpts } from "./TDecimalOpts";
import { TDateOpts } from "./TDateOpts";
import { TTimeOpts } from "./TTimeOpts";
import { TTimestampOpts } from "./TTimestampOpts";
import { DataType } from "../enums";

/**
 * An object to define field type.
 */
export type TType =
  | {
      type:
        | DataType.Int8
        | DataType.Int16
        | DataType.Int32
        | DataType.Int64
        | DataType.Uint8
        | DataType.Uint16
        | DataType.Uint32
        | DataType.Uint64
        | DataType.Float16
        | DataType.Float32
        | DataType.Float64
        | DataType.Binary
        | DataType.Utf8;
      options: TCommonOpts;
    }
  | {
      type: DataType.Decimal;
      options: TDecimalOpts;
    }
  | {
      type: DataType.Date;
      options: TDateOpts;
    }
  | {
      type: DataType.Time;
      options: TTimeOpts;
    }
  | {
      type: DataType.Timestamp;
      options: TTimestampOpts;
    };
