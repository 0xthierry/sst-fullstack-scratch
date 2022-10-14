export default function handler(lambda) {
  return async function (event, context) {
    try {
      const { data, statusCode } = await lambda(event, context) || {};
      return {
        statusCode: statusCode || 200,
        body: data ? JSON.stringify(data) : null,
      };
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e.message }),
      };
    }
  };
}
