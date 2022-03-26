import { useEffect, useState } from "react";
import { database } from "../lib/data/db";

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.setupDatabase();
        setDBLoadingComplete(true);
      } catch (error) {
        console.error(error);
      }
    }

    loadDataAsync();
  });
  return isDBLoadingComplete;
}
