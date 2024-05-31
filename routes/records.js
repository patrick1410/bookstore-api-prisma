import express from "express";

import { getRecords } from "../services/records/getRecords.js";

const router = express.Router();

router.get("/", (req, res) => {
  // Het is niet nodig om hier /records van te maken dat word al gedefinieerd in index.js
  try {
    const records = getRecords();
    res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while getting list of records!");
  }
});

router.get("/:id", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export default router;
