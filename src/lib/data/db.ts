import * as SQLite from "expo-sqlite";
import { Plant } from "./model/plants";

const tableName = "plantData";

export function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}

export const createTable = async (db: SQLite.WebSQLDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.transaction((tx) => tx.executeSql(query));
};

export const fetchPlants = (db: SQLite.WebSQLDatabase): Plant[] => {
  try {
    const plants: Plant[] = [];

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT rowid as id,value FROM ${tableName}`,
        undefined,
        (_, { rows: { _array } }) => _array.map((entry) => plants.push(entry))
      );
    });

    return plants;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get PlantData !!!");
  }
};

export const addPlant = (db: SQLite.WebSQLDatabase, plant: Plant) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO ${tableName} (rowid, name, species) values (?, ?, ?)`,
        [plant.id, plant.name, plant.species]
      );
      tx.executeSql(
        `SELECT rowid as id, value FROM ${tableName}`,
        [],
        (_, { rows }) => console.log(JSON.stringify(rows))
      );
    });
  } catch (error) {
    console.error(error);
  }
};
