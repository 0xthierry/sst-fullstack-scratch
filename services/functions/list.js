import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async () => {
  const notes = await notesRepository.getAllNotesByUserId({
    userId: "123"
  });

  return { data: notes };
});
