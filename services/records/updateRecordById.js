import recordData from "../../data/records.json" assert { type: "json" };
import { NotFoundError } from "../../errors/notFoundError.js";

export const updateRecordById = (id, title, artist, year, available, genre) => {
  const record = recordData.records.find((record) => record.id === id);

  if (!record) {
    throw new NotFoundError("Record", id);
  }

  record.title = title ?? record.title;
  record.artist = artist ?? record.artist;
  record.year = year ?? record.year;
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
};
