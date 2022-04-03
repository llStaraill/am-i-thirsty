import { Log } from "../logs";

interface EDIT_NAME {
  type: "EDIT_NAME";
  name: string;
}

interface EDIT_SPECIES {
  type: "EDIT_SPECIES";
  species: string;
}

interface EDIT_IMAGE {
  type: "EDIT_IMAGE";
  image: any;
}

interface SET_FAVORITE {
  type: "SET_FAVORITE";
  favorited: boolean;
}

interface SET_LIGHT_NEED {
  type: "SET_LIGHT_NEED";
  need: "LOW" | "SHADE" | "FULL";
}

interface EDIT_DESCRIPTION {
  type: "EDIT_DESCRIPTION";
  description: string;
}

interface EDIT_LOCATION {
  type: "EDIT_LOCATION";
  location: string;
}

interface EDIT_TOXICITY {
  type: "EDIT_TOXICITY";
  toxicity: "NON_TOXIC" | "TOXIC_TO_PETS" | "TOXIC_TO_HUMAN";
}

interface EDIT_WATER_NEEDS {
  type: "EDIT_WATER_NEEDS";
  waterNeeds: number; // Handle in days -> calculate in FE for Weeks / Months
}

interface ADD_LOGS {
  type: "ADD_LOGS";
  log: Log[];
}
export type PlantAction =
  | EDIT_NAME
  | EDIT_SPECIES
  | EDIT_IMAGE
  | ADD_LOGS
  | SET_FAVORITE
  | SET_LIGHT_NEED
  | EDIT_DESCRIPTION
  | EDIT_LOCATION
  | EDIT_TOXICITY
  | EDIT_WATER_NEEDS;
