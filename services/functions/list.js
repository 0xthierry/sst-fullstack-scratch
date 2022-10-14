import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  const notes = await notesRepository.getAllNotesByUserId({
    userId: userId,
  });

  return { data: notes };
});
