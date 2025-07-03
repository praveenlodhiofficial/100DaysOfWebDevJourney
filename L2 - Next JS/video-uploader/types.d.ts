import { connection } from "mongoose";

declare global {
  var mongoose: {
    connection: connection | null;
    promise: Promise<Coonection> | null;
  };
}

export {};
