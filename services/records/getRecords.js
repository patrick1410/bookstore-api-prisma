import recordData from "../../data/records.json" assert { type: "json" };

export const getRecords = (artist, genre, available) => {
  let records = recordData.records;

  if (artist) {
    records = records.filter((record) => record.artist === artist);
  }

  if (genre) {
    records = records.filter((record) => record.genre === genre);
  }

  if (available !== undefined) {
    records = records.filter(
      (record) => record.available === JSON.parse(available)
    );
  }

  return records;
};
