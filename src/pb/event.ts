/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "event";

export enum ViewCountEventType {
  VIEWCOUNTEVENTTYPE_UNSPECIFIED = 0,
  /** VIEWCOUNTEVENTTYPE_INCREASE - [(event_name) = "INCREASE"] */
  VIEWCOUNTEVENTTYPE_INCREASE = 1,
  /** VIEWCOUNTEVENTTYPE_DECREASE - [(event_name) = "DECREASE"] */
  VIEWCOUNTEVENTTYPE_DECREASE = 2,
  UNRECOGNIZED = -1,
}

export function viewCountEventTypeFromJSON(object: any): ViewCountEventType {
  switch (object) {
    case 0:
    case "VIEWCOUNTEVENTTYPE_UNSPECIFIED":
      return ViewCountEventType.VIEWCOUNTEVENTTYPE_UNSPECIFIED;
    case 1:
    case "VIEWCOUNTEVENTTYPE_INCREASE":
      return ViewCountEventType.VIEWCOUNTEVENTTYPE_INCREASE;
    case 2:
    case "VIEWCOUNTEVENTTYPE_DECREASE":
      return ViewCountEventType.VIEWCOUNTEVENTTYPE_DECREASE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ViewCountEventType.UNRECOGNIZED;
  }
}

export function viewCountEventTypeToJSON(object: ViewCountEventType): string {
  switch (object) {
    case ViewCountEventType.VIEWCOUNTEVENTTYPE_UNSPECIFIED:
      return "VIEWCOUNTEVENTTYPE_UNSPECIFIED";
    case ViewCountEventType.VIEWCOUNTEVENTTYPE_INCREASE:
      return "VIEWCOUNTEVENTTYPE_INCREASE";
    case ViewCountEventType.VIEWCOUNTEVENTTYPE_DECREASE:
      return "VIEWCOUNTEVENTTYPE_DECREASE";
    case ViewCountEventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum DBEventType {
  DBEVENTTYPE_UNSPECIFIED = 0,
  /** DBEVENTTYPE_DELETE - [(event_name) = "DELETE"] */
  DBEVENTTYPE_DELETE = 1,
  /** DBEVENTTYPE_INSERT - [(event_name) = "INSERT"] */
  DBEVENTTYPE_INSERT = 2,
  /** DBEVENTTYPE_UPDATE - [(event_name) = "UPDATE"] */
  DBEVENTTYPE_UPDATE = 3,
  UNRECOGNIZED = -1,
}

export function dBEventTypeFromJSON(object: any): DBEventType {
  switch (object) {
    case 0:
    case "DBEVENTTYPE_UNSPECIFIED":
      return DBEventType.DBEVENTTYPE_UNSPECIFIED;
    case 1:
    case "DBEVENTTYPE_DELETE":
      return DBEventType.DBEVENTTYPE_DELETE;
    case 2:
    case "DBEVENTTYPE_INSERT":
      return DBEventType.DBEVENTTYPE_INSERT;
    case 3:
    case "DBEVENTTYPE_UPDATE":
      return DBEventType.DBEVENTTYPE_UPDATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DBEventType.UNRECOGNIZED;
  }
}

export function dBEventTypeToJSON(object: DBEventType): string {
  switch (object) {
    case DBEventType.DBEVENTTYPE_UNSPECIFIED:
      return "DBEVENTTYPE_UNSPECIFIED";
    case DBEventType.DBEVENTTYPE_DELETE:
      return "DBEVENTTYPE_DELETE";
    case DBEventType.DBEVENTTYPE_INSERT:
      return "DBEVENTTYPE_INSERT";
    case DBEventType.DBEVENTTYPE_UPDATE:
      return "DBEVENTTYPE_UPDATE";
    case DBEventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  time: number;
}

export interface DBChangeEvent {
  dbEventType: DBEventType;
  comment: Comment | undefined;
}

export interface ViewCountEvent {
  viewCountEventType: ViewCountEventType;
  viewCount: number;
}

export interface Event {
  dbChangeEvent?: DBChangeEvent | undefined;
  viewCountEvent?: ViewCountEvent | undefined;
}

function createBaseComment(): Comment {
  return { id: 0, author: "", content: "", time: 0 };
}

export const Comment = {
  encode(message: Comment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.author !== "") {
      writer.uint32(18).string(message.author);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.time !== 0) {
      writer.uint32(32).int64(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Comment {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      author: isSet(object.author) ? globalThis.String(object.author) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      time: isSet(object.time) ? globalThis.Number(object.time) : 0,
    };
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Comment>, I>>(base?: I): Comment {
    return Comment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Comment>, I>>(object: I): Comment {
    const message = createBaseComment();
    message.id = object.id ?? 0;
    message.author = object.author ?? "";
    message.content = object.content ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseDBChangeEvent(): DBChangeEvent {
  return { dbEventType: 0, comment: undefined };
}

export const DBChangeEvent = {
  encode(message: DBChangeEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dbEventType !== 0) {
      writer.uint32(8).int32(message.dbEventType);
    }
    if (message.comment !== undefined) {
      Comment.encode(message.comment, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DBChangeEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDBChangeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dbEventType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.comment = Comment.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DBChangeEvent {
    return {
      dbEventType: isSet(object.dbEventType) ? dBEventTypeFromJSON(object.dbEventType) : 0,
      comment: isSet(object.comment) ? Comment.fromJSON(object.comment) : undefined,
    };
  },

  toJSON(message: DBChangeEvent): unknown {
    const obj: any = {};
    if (message.dbEventType !== 0) {
      obj.dbEventType = dBEventTypeToJSON(message.dbEventType);
    }
    if (message.comment !== undefined) {
      obj.comment = Comment.toJSON(message.comment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DBChangeEvent>, I>>(base?: I): DBChangeEvent {
    return DBChangeEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DBChangeEvent>, I>>(object: I): DBChangeEvent {
    const message = createBaseDBChangeEvent();
    message.dbEventType = object.dbEventType ?? 0;
    message.comment = (object.comment !== undefined && object.comment !== null)
      ? Comment.fromPartial(object.comment)
      : undefined;
    return message;
  },
};

function createBaseViewCountEvent(): ViewCountEvent {
  return { viewCountEventType: 0, viewCount: 0 };
}

export const ViewCountEvent = {
  encode(message: ViewCountEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.viewCountEventType !== 0) {
      writer.uint32(8).int32(message.viewCountEventType);
    }
    if (message.viewCount !== 0) {
      writer.uint32(16).uint32(message.viewCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ViewCountEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseViewCountEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.viewCountEventType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.viewCount = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ViewCountEvent {
    return {
      viewCountEventType: isSet(object.viewCountEventType) ? viewCountEventTypeFromJSON(object.viewCountEventType) : 0,
      viewCount: isSet(object.viewCount) ? globalThis.Number(object.viewCount) : 0,
    };
  },

  toJSON(message: ViewCountEvent): unknown {
    const obj: any = {};
    if (message.viewCountEventType !== 0) {
      obj.viewCountEventType = viewCountEventTypeToJSON(message.viewCountEventType);
    }
    if (message.viewCount !== 0) {
      obj.viewCount = Math.round(message.viewCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ViewCountEvent>, I>>(base?: I): ViewCountEvent {
    return ViewCountEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ViewCountEvent>, I>>(object: I): ViewCountEvent {
    const message = createBaseViewCountEvent();
    message.viewCountEventType = object.viewCountEventType ?? 0;
    message.viewCount = object.viewCount ?? 0;
    return message;
  },
};

function createBaseEvent(): Event {
  return { dbChangeEvent: undefined, viewCountEvent: undefined };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dbChangeEvent !== undefined) {
      DBChangeEvent.encode(message.dbChangeEvent, writer.uint32(10).fork()).ldelim();
    }
    if (message.viewCountEvent !== undefined) {
      ViewCountEvent.encode(message.viewCountEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dbChangeEvent = DBChangeEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.viewCountEvent = ViewCountEvent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      dbChangeEvent: isSet(object.dbChangeEvent) ? DBChangeEvent.fromJSON(object.dbChangeEvent) : undefined,
      viewCountEvent: isSet(object.viewCountEvent) ? ViewCountEvent.fromJSON(object.viewCountEvent) : undefined,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.dbChangeEvent !== undefined) {
      obj.dbChangeEvent = DBChangeEvent.toJSON(message.dbChangeEvent);
    }
    if (message.viewCountEvent !== undefined) {
      obj.viewCountEvent = ViewCountEvent.toJSON(message.viewCountEvent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.dbChangeEvent = (object.dbChangeEvent !== undefined && object.dbChangeEvent !== null)
      ? DBChangeEvent.fromPartial(object.dbChangeEvent)
      : undefined;
    message.viewCountEvent = (object.viewCountEvent !== undefined && object.viewCountEvent !== null)
      ? ViewCountEvent.fromPartial(object.viewCountEvent)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
