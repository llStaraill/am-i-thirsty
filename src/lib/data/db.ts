import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransactionErrorCallback } from "expo-sqlite";
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
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id integer primary key not null, name text, species text, image text);`;

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query);
      },
      (error: SQLError) => {
        console.log("db error creating tables");
        console.log(error);
        reject(error);
      },
      () => {
        resolve(`Successfully created ${tableName}`);
      }
    );
  });
};

const getPlants = async (setPlants: (plants: Plant[]) => void) => {
  const query = `SELECT * from ${tableName}`;
  db.transaction(
    (tx) => {
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        setPlants(_array);
      });
    },
    (error: SQLError) => {
      console.log("db error creating tables");
      console.log(error);
    },
    () => {
      console.log("Loaded all plants");
    }
  );
};

const insertPlant = (plant: Plant, successCallback: () => void) => {
  const query = `INSERT into ${tableName} (id, name, species, image) values (?,?,?,?)`;
  db.transaction(
    (tx) => {
      tx.executeSql(query, [plant.id, plant.name, plant.species, plant.image]);
    },
    (error: SQLError) => {
      console.log("Failed to insert new Plant");
      console.log(error);
    },
    () => successCallback()
  );
};

const deletePlant = (id: number, successCallback: () => void) => {
  const query = `DELETE from ${tableName} where id = ${id}`;
  db.transaction(
    (tx) => {
      tx.executeSql(query);
    },
    (error: SQLError) => {
      console.log("Failed to insert new Plant");
      console.log(error);
    },
    () => successCallback()
  );
};

const getPlantById = (id: number, setPlants: (plants: Plant) => void) => {
  const query = `SELECT * from ${tableName} where id = ${id}`;

  db.transaction(
    (tx) => {
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        setPlants(_array[0]);
      });
    },
    (error: SQLError) => {
      console.log("db error creating tables");
      console.log(error);
    },
    () => {
      console.log("Loaded all plants");
    }
  );
};

export const database = {
  getPlants,
  insertPlant,
  deletePlant,
  setupDatabase,
  dropDatabase,
  getPlantById,
};
