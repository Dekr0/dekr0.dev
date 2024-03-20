/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "log";

export enum LogLevel {
  LOGLEVEL_UNSPECIFIED = 0,
  LOGLEVEL_DEBUG = 1,
  LOGLEVEL_INFO = 2,
  LOGLEVEL_WARN = 3,
  LOGLEVEL_ERROR = 4,
  UNRECOGNIZED = -1,
}

export function logLevelFromJSON(object: any): LogLevel {
  switch (object) {
    case 0:
    case "LOGLEVEL_UNSPECIFIED":
      return LogLevel.LOGLEVEL_UNSPECIFIED;
    case 1:
    case "LOGLEVEL_DEBUG":
      return LogLevel.LOGLEVEL_DEBUG;
    case 2:
    case "LOGLEVEL_INFO":
      return LogLevel.LOGLEVEL_INFO;
    case 3:
    case "LOGLEVEL_WARN":
      return LogLevel.LOGLEVEL_WARN;
    case 4:
    case "LOGLEVEL_ERROR":
      return LogLevel.LOGLEVEL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogLevel.UNRECOGNIZED;
  }
}

export function logLevelToJSON(object: LogLevel): string {
  switch (object) {
    case LogLevel.LOGLEVEL_UNSPECIFIED:
      return "LOGLEVEL_UNSPECIFIED";
    case LogLevel.LOGLEVEL_DEBUG:
      return "LOGLEVEL_DEBUG";
    case LogLevel.LOGLEVEL_INFO:
      return "LOGLEVEL_INFO";
    case LogLevel.LOGLEVEL_WARN:
      return "LOGLEVEL_WARN";
    case LogLevel.LOGLEVEL_ERROR:
      return "LOGLEVEL_ERROR";
    case LogLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Log {
  level: LogLevel;
  filename: string;
  function: string;
  message: string;
  error: string;
}

function createBaseLog(): Log {
  return { level: 0, filename: "", function: "", message: "", error: "" };
}

export const Log = {
  encode(message: Log, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    if (message.filename !== "") {
      writer.uint32(18).string(message.filename);
    }
    if (message.function !== "") {
      writer.uint32(26).string(message.function);
    }
    if (message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    if (message.error !== "") {
      writer.uint32(42).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Log {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.level = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filename = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.function = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Log {
    return {
      level: isSet(object.level) ? logLevelFromJSON(object.level) : 0,
      filename: isSet(object.filename) ? globalThis.String(object.filename) : "",
      function: isSet(object.function) ? globalThis.String(object.function) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: Log): unknown {
    const obj: any = {};
    if (message.level !== 0) {
      obj.level = logLevelToJSON(message.level);
    }
    if (message.filename !== "") {
      obj.filename = message.filename;
    }
    if (message.function !== "") {
      obj.function = message.function;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Log>, I>>(base?: I): Log {
    return Log.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Log>, I>>(object: I): Log {
    const message = createBaseLog();
    message.level = object.level ?? 0;
    message.filename = object.filename ?? "";
    message.function = object.function ?? "";
    message.message = object.message ?? "";
    message.error = object.error ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
