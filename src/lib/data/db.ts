import * as SQLite from "expo-sqlite";
import { Plant } from "./model/plants";

const tableName = "plantData";

const db = SQLite.openDatabase("db.db");

const dropDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP table ${tableName}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log("error dropping users table");
          reject(error);
          return false;
        }
      );
    });
  });
};

const setupDatabase = async () => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}id integer primary key not null, name text, species text);`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(query),
        [],
        (_: any, error: unknown) => {
          console.log("db error creating tables");
          console.log(error);
          reject(error);
          return false;
        },
        (_: any, success: unknown) => {
          resolve(success);
        };
    });
  });
};

const getPlants = (
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
) => {
  const query = `SELECT * from ${tableName}`;
  db.transaction((tx) => {
    tx.executeSql(query, [], (_, { rows: { _array } }) => setPlants(_array));
  });
};

const insertPlant = (plant: Plant) => {
  const query = `INSERT into ${tableName} (id, name, species) values (?,?,?)`;
  db.transaction((tx) => {
    tx.executeSql(
      query,
      [plant.id, plant.name, plant.species],
      (_: any, error: unknown) => {
        console.log("db error creating tables");
        console.log(error);
        return false;
      }
    );
  });
};

const deletePlant = (id: string) => {
  const query = `DELETE from ${tableName} where id = ${id}`;
  db.transaction((tx) => {
    tx.executeSql(query);
  });
};

export const database = {
  getPlants,
  insertPlant,
  deletePlant,
  setupDatabase,
  dropDatabase,
};
