import { action, makeObservable, observable } from "mobx";
import React, { createContext, useContext } from "react";
import { database } from "../lib/data/db";
import { Plant } from "../lib/data/model/plants";

class PlantStore {
  plants: Plant[] = [];

  constructor() {
    makeObservable(this, {
      plants: observable,
      addNewPlant: action.bound,
      fetchPlants: action.bound,
      setPlants: action.bound,
      deletePlant: action.bound,
    });

    this.fetchPlants();
  }

  setPlants = (plantResult: Plant[]) => {
    this.plants = [...plantResult];
  };

  async fetchPlants() {
    await database.getPlants(this.setPlants);
  }

  addNewPlant(newPlant: Plant, successCallback: () => void) {
    database.insertPlant(newPlant, successCallback);
    this.fetchPlants();
  }

  deletePlant(id: number, successCallback: () => void) {
    database.deletePlant(id, successCallback);
    this.fetchPlants();
  }
}

const plantStore = new PlantStore();
export const PlantStoreContext = createContext(plantStore);
export const usePlantStore = () => useContext(PlantStoreContext);
