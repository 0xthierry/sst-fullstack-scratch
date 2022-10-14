import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const noteId = event.pathParameters.id;

  const note = await notesRepository.getByUserIdAndNoteId({
    userId: "123",
    noteId: noteId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return { data: note };
});
