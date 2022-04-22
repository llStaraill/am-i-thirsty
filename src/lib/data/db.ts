import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransactionErrorCallback } from "expo-sqlite";
import { Plant } from "./model/plants";

const tableName = "plantData";

//Columns
const ID = "id";
const NAME = "name";
const SPECIES = "species";
const IMAGE = "image";
const LIGHT_NEED = "lightNeed";
const TOXICITY = "toxicity";
const WATER_FREQUENCY = "waterFrequency";
const DESCRIPTION = "description";
const LOCATION = "location";
const LOGS = "logs";
const FAVORITE = "favorite";

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
          console.log(`Error dropping ${tableName} table`);
          reject(error);
          return false;
        }
      );
    });
  });
};

const setupDatabase = async () => {
  // create table if not exists

  /* const id = `id INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL `
  const name = `name TEXT`
  const species = `species TEXT`
  const image = `image TEXT`
  const lightNeed  = `lightNeed TEXT CHECK( lightNeed IN ('LOW','SHADE','FULL')) NOT NULL DEFAULT 'SHADE'`
  const toxicity = `toxicity TEXT CHECK (toxicity in ('NON_TOXIC', 'TOXIC_TO_PETS', 'TOXIC_TO_HUMANS')) NOT NULL DEFAULT 'NON_TOXIC'`
  const waterFrequency = `waterFrequency INTEGER`
  const description = `description TEXT`
  const location= `location TEXT`
  const logs = `logs BLOB` */

  //const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${id}, ${name}, ${species}, ${image}, ${waterFrequency}, ${lightNeed});`;

  const query =
    `CREATE TABLE IF NOT EXISTS ${tableName}` +
    "(" +
    `${ID} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL` +
    "," +
    `${NAME} TEXT NOT NULL` +
    "," +
    `${SPECIES} TEXT NOT NULL` +
    "," +
    `${IMAGE} TEXT` +
    "," +
    `${DESCRIPTION} TEXT` +
    "," +
    `${TOXICITY} BLOB` +
    "," +
    `${LIGHT_NEED} TEXT CHECK (${LIGHT_NEED} IN ('LOW', 'SHADE', 'FULL'))` +
    "," +
    `${WATER_FREQUENCY} INTEGER` +
    "," +
    `${LOCATION} TEXT` +
    "," +
    `${LOGS} BLOB` +
    "," +
    `${FAVORITE} BOOLEAN DEFAULT FALSE` +
    ")";

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
  const query = `INSERT into ${tableName} (${ID}, ${NAME}, ${SPECIES}, ${IMAGE}, ${DESCRIPTION}, ${TOXICITY}, ${LIGHT_NEED}, ${WATER_FREQUENCY}, ${LOCATION}, ${LOGS}, ${FAVORITE}) values (?,?,?,?,?,?,?,?,?,?,?)`;
  db.transaction(
    (tx) => {
      tx.executeSql(query, [
        plant.id,
        plant.name,
        plant.species,
        plant.image,
        plant.description,
        JSON.stringify(plant.toxicity),
        plant.lightNeed,
        plant.waterFrequency,
        plant.location,
        JSON.stringify(plant.logs),
        plant.favorite,
      ]);
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
