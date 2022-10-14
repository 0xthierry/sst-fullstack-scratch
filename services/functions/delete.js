import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const noteId = event.pathParameters.id;

  await notesRepository.delete({
    userId: "123",
    noteId: noteId,
  });
});
