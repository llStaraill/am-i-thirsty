import React, { createContext, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { Plant } from "../lib/data/model/plants";
import { openDatabase } from "../lib/data/db";

interface PlantContextProps {
  db: SQLite.WebSQLDatabase;
}

const db = openDatabase();

const PlantContext = createContext<PlantContextProps>({ db });

const PlantProvider = (props: any) => {
  return (
    <PlantContext.Provider value={{ db: db }}>
      {props.children}
    </PlantContext.Provider>
  );
};

export { PlantProvider, PlantContext };
