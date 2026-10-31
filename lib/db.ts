import mongoose from "mongoose";
import { requireEnv } from "./env";

declare global {
  var tabloidMongoose: Promise<typeof mongoose> | undefined;
}

export function connectToDatabase(): Promise<typeof mongoose> {
  if (!globalThis.tabloidMongoose) {
    mongoose.set("strictQuery", false);
    globalThis.tabloidMongoose = mongoose
      .connect(requireEnv("MONGODB_URI"), {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error: unknown) => {
        globalThis.tabloidMongoose = undefined;
        throw error;
      });
  }
  return globalThis.tabloidMongoose;
}
