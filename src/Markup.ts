/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { ByteBuffer, Builder } from "flatbuffers";
import { Markup as _Markup } from "./.fbs/hdml.Markup_generated";
import { Model } from "./.fbs/hdml.Model_generated";
import { Frame } from "./.fbs/hdml.Frame_generated";
import { ModelHelper } from "./helpers/ModelHelper";
import { FrameHelper } from "./helpers/FrameHelper";
import { TModel, TFrame, TMarkup } from "./types";

/**
 * Query class.
 */
export class Markup {
  private _builder: Builder;
  private _buffer: ByteBuffer;
  private _model: ModelHelper;
  private _frame: FrameHelper;
  private _query: _Markup;

  public get buffer(): Uint8Array {
    return this._buffer.bytes();
  }

  public get model(): undefined | TModel {
    const model = this._query.model(new Model());
    if (model) {
      return this._model.parseModel(model);
    }
    return;
  }

  public get frame(): undefined | TFrame {
    const frame = this._query.frame(new Frame());
    if (frame) {
      return this._frame.parseFrame(frame);
    }
    return;
  }

  constructor(data: Uint8Array | TMarkup) {
    this._builder = new Builder(1024);
    this._model = new ModelHelper(this._builder);
    this._frame = new FrameHelper(this._builder);
    if (data instanceof Uint8Array) {
      this._buffer = new ByteBuffer(data);
      this._query = _Markup.getRootAsMarkup(this._buffer);
    } else {
      let model: undefined | number;
      if (data.model) {
        model = this._model.bufferizeModel(data.model);
      }
      let frame: undefined | number;
      if (data.frame) {
        frame = this._frame.bufferizeFrame(data.frame);
      }
      _Markup.startMarkup(this._builder);
      if (model) {
        _Markup.addModel(this._builder, model);
      }
      if (frame) {
        _Markup.addFrame(this._builder, frame);
      }
      this._builder.finish(_Markup.endMarkup(this._builder));
      this._buffer = new ByteBuffer(this._builder.asUint8Array());
      this._query = _Markup.getRootAsMarkup(this._buffer);
    }
  }
}
