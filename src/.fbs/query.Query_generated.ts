// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import {Frame as Frame} from './query.Frame_generated.js';
import {Model as Model} from './query.Model_generated.js';

/**
 * Query structure.
 */
export class Query {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Query {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsQuery(bb:flatbuffers.ByteBuffer, obj?:Query):Query {
  return (obj || new Query()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsQuery(bb:flatbuffers.ByteBuffer, obj?:Query):Query {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Query()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

model(obj?:Model):Model|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new Model()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

frame(obj?:Frame):Frame|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new Frame()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startQuery(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addModel(builder:flatbuffers.Builder, modelOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, modelOffset, 0);
}

static addFrame(builder:flatbuffers.Builder, frameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, frameOffset, 0);
}

static endQuery(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

}
