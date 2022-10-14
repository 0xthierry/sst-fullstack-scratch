import notesRepository from "../../database/repositories/notes";
import handler from "../handler";

export const main = handler(async (event) => {
  const body = JSON.parse(event.body);

  const created = await notesRepository.create({
    userId: "123",
    attachment: body.attachment,
    content: body.content,
  });

  return { data: created };
});
