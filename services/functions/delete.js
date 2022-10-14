import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const noteId = event.pathParameters.id;
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  await notesRepository.delete({
    userId: userId,
    noteId: noteId,
  });
});
