import { Plant } from "../data/model/plants";

const getId = (plants: Plant[]) => {
  let id = 0;
  if (plants.length > 0) {
    id =
      plants.reduce((acc, cur) => {
        if (cur.id > acc.id) return cur;
        return acc;
      }).id + 1;
  }
  return id;
};

export { getId };
