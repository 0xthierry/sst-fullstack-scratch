import { Table, Bucket } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
  const table = new Table(stack, "notes", {
    fields: {
      user_id: "string",
      note_id: "string",
    },
    primaryIndex: { partitionKey: "user_id", sortKey: "note_id" },
  });

  const bucket = new Bucket(stack, "uploads");

  return {
    table,
    bucket,
  };
}
