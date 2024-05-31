import recordData from "../../data/records.json" assert { type: "json" };

export const getRecords = () => {
  let records = recordData.records;

  return records;
};
