import { useEffect, useState } from "react";
import { usePlantStore } from "../context/plantContext";
import { database } from "../lib/data/db";

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(false);
  const { fetchPlants } = usePlantStore();

  useEffect(() => {
    async function loadDataAsync() {
      try {
        // await database.dropDatabase();
        await database.setupDatabase();
        fetchPlants();

        setDBLoadingComplete(true);
      } catch (error) {
        console.error(error);
      }
    }

    loadDataAsync();
  });
  return isDBLoadingComplete;
}
