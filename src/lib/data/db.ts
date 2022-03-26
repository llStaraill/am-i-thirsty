import * as SQLite from "expo-sqlite";
import { Plant } from "./model/plants";

const tableName = "plantData";

const db = SQLite.openDatabase("db.db");

export const createTable = async (db: SQLite.WebSQLDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.transaction((tx) => tx.executeSql(query));
};

export const getPlant = async (db: SQLite.WebSQLDatabase): Promise<Plant[]> => {
  try {
    const plants: Plant[] = [];

    const results = await db.transaction((tx) =>
      tx.executeSql(`SELECT rowid as id,value FROM ${tableName}`)
    );

    return plants;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get PlantData !!!");
  }
};
