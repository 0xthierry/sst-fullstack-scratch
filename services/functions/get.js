import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const noteId = event.pathParameters.id;
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  const note = await notesRepository.getByUserIdAndNoteId({
    userId: userId,
    noteId: noteId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return { data: note };
});
