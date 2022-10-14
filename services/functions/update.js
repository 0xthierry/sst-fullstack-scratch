import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const body = JSON.parse(event.body);
  const noteId = event.pathParameters.id;

  const updated = await notesRepository.update({
    userId: "123",
    noteId: noteId,
    attachment: body.attachment,
    content: body.content,
  });

  return { data: updated };
});
