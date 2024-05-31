import recordData from "../../data/records.json" assert { type: "json" };

export const deleteRecord = (id) => {
  const index = recordData.records.findIndex((record) => record.id === id);

  if (index === -1) {
    return null;
  }

  recordData.records.splice(index, 1);
  return id;
};
