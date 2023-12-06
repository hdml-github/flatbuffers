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
import { DataTypeEnum } from "../enums";

/**
 * An object to define field type.
 */
export type TType =
  | {
      type:
        | DataTypeEnum.Int8
        | DataTypeEnum.Int16
        | DataTypeEnum.Int32
        | DataTypeEnum.Int64
        | DataTypeEnum.Uint8
        | DataTypeEnum.Uint16
        | DataTypeEnum.Uint32
        | DataTypeEnum.Uint64
        | DataTypeEnum.Float16
        | DataTypeEnum.Float32
        | DataTypeEnum.Float64
        | DataTypeEnum.Binary
        | DataTypeEnum.Utf8;
      options: TCommonOpts;
    }
  | {
      type: DataTypeEnum.Decimal;
      options: TDecimalOpts;
    }
  | {
      type: DataTypeEnum.Date;
      options: TDateOpts;
    }
  | {
      type: DataTypeEnum.Time;
      options: TTimeOpts;
    }
  | {
      type: DataTypeEnum.Timestamp;
      options: TTimestampOpts;
    };
