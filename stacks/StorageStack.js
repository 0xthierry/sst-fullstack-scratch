import { Table, Bucket } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
  const table = new Table(stack, "notes", {
    fields: {
      user_id: "string",
      note_id: "string",
    },
    primaryIndex: { partitionKey: "user_id", sortKey: "note_id" },
  });

  const bucket = new Bucket(stack, "uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      }
    ]
  });

  return {
    table,
    bucket,
  };
}
