import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  // const { id } = req.query; // siempre son strings en las req

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: `Id ${id} no es válido` });
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      return res
        .status(400)
        .json({ message: `El Método de la peticion es Incorrecto` });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();
  const entryToGet = await Entry.findById(id);
  await db.disconnect();

  if (!entryToGet) {
    return res
      .status(400)
      .json({ message: `No existe una entrada con la ID deseada -> (${id})` });
  }

  return res.status(200).json(entryToGet);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `Ninguna entrada con esa Id (${id})` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

  // entryToUpdate.description = description; Otra forma de hacer el updated entry
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};
