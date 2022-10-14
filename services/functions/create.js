import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const body = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  const created = await notesRepository.create({
    userId: userId,
    attachment: body.attachment,
    content: body.content,
  });

  return { data: created };
});
