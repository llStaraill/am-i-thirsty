import React, { useEffect, createContext, useState } from "react";
import { database } from "../lib/data/db";
import { Plant } from "../lib/data/model/plants";

const addNewPlant = (plant: Plant, successCallback: () => void) => {
  return database.insertPlant(plant, successCallback);
};

interface PlantContextProps {
  plants: Plant[];
  addNewPlant: (plant: Plant, successCallback: () => void) => void;
}

export const PlantContext = createContext<PlantContextProps>({
  plants: [],
  addNewPlant,
});

interface PlantContextProviderProps {
  children: any;
}

export const PlantContextProvider = ({
  children,
}: PlantContextProviderProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    console.log("refreshing");
    refreshPlants();
  }, []);

  const refreshPlants = () => database.getPlants(setPlants);

  const plantContext = {
    plants,
    addNewPlant,
  };

  return (
    <PlantContext.Provider value={plantContext}>
      {children}
    </PlantContext.Provider>
  );
};
