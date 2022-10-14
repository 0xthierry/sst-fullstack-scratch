import AWS from "aws-sdk";

const database = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params) => database.get(params).promise(),
  put: (params) => database.put(params).promise(),
  query: (params) => database.query(params).promise(),
  update: (params) => database.update(params).promise(),
  delete: (params) => database.delete(params).promise(),
};