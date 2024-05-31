import recordData from "../../data/records.json" assert { type: "json" };

export const getRecordById = (id) => {
  return recordData.records.find((record) => record.id === id);
};
