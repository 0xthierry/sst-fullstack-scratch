import { v4 as uuid } from "uuid";
import database from "..";

const TABLE_NAME = process.env.TABLE_NAME;

const create = async ({ userId, content, attachment }) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      user_id: userId,
      content: content,
      attachment: attachment || null,
      note_id: uuid(),
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  };

  await database.put(params);

  return params.Item;
};

const getByUserIdAndNoteId = async ({ userId, noteId }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      user_id: userId,
      note_id: noteId,
    },
  };

  const result = await database.get(params);

  return result.Item;
};

const getAllNotesByUserId = async ({ userId }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userId,
    },
  };

  const result = await database.query(params);

  return result.Items;
};

const update = async ({ userId, noteId, content, attachment }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      user_id: userId,
      note_id: noteId,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": attachment || null,
      ":content": content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await database.update(params);

  return result.$response.data;
};

const remove = async ({ noteId, userId }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      user_id: userId,
      note_id: noteId,
    },
  };

  await database.delete(params);
};

export default {
  getByUserIdAndNoteId,
  getAllNotesByUserId,
  create,
  update,
  delete: remove,
};
