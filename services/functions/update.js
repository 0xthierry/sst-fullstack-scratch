import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const body = JSON.parse(event.body);
  const noteId = event.pathParameters.id;
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  const updated = await notesRepository.update({
    userId: userId,
    noteId: noteId,
    attachment: body.attachment,
    content: body.content,
  });

  return { data: updated };
});
