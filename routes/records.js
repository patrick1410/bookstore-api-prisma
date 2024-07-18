import express from "express";

import { getRecords } from "../services/records/getRecords.js";
import { getRecordById } from "../services/records/getRecordById.js";
import { createRecord } from "../services/records/createRecord.js";
import { updateRecordById } from "../services/records/updateRecordById.js";
import { deleteRecord } from "../services/records/deleteRecord.js";

import authMiddleware from "../middleware/auth.js";
import { notFoundErrorHandler } from "../middleware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // Het is niet nodig om hier /records van te maken dat word al gedefinieerd in index.js
  try {
    const { artist, genre, available } = req.query;
    const records = await getRecords(artist, genre, available);
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of books!");
  }
});

// router.get("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const record = getRecordById(id);

//     if (!record) {
//       res.status(404).send(`Record with id ${id} was not found!`);
//     } else {
//       res.status(200).json(record);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Something went wrong while getting record by id!");
//   }
// });

// Errors coming from async functions, we have to send the error to the middleware via the built-in next function of our Express route next(error).
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const record = await getRecordById(id);

      res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res) => {
  const { title, artist, year, available, genre } = req.body;
  const newBook = await createRecord(title, artist, year, available, genre);
  res.status(201).json(newBook);
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, artist, year, available, genre } = req.body;
      const updatedRecord = await updateRecordById(
        id,
        title,
        artist,
        year,
        available,
        genre
      );
      res.status(200).json(updatedRecord);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedRecordId = await deleteRecord(id);

      res.status(200).json({
        message: `Record with id ${deletedRecordId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
