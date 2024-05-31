import recordData from "../../data/records.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

export const createRecord = (title, artist, year, available, genre) => {
  const newRecord = {
    id: uuid(),
    title,
    artist,
    year,
    available,
    genre,
  };

  recordData.records.push(newRecord);
  return newRecord;
};
