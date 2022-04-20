import { Plant, Toxicity } from "../../lib/data/model/plants";
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

interface EDIT_LIGHT_NEED {
  type: "EDIT_LIGHT_NEED";
  lightNeed: "LOW" | "SHADE" | "FULL";
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
  toxicity: Toxicity;
}

interface EDIT_WATER_FREQUENCY {
  type: "EDIT_WATER_FREQUENCY";
  waterFrequency: number; // Handle in days -> calculate in FE for Weeks / Months
}

interface ADD_LOGS {
  type: "ADD_LOGS";
  log: Log[];
}

interface EDIT_TOXICITY_PETS {
  type: "EDIT_TOXICITY_PETS";
  toxicity: boolean;
}

interface EDIT_TOXICITY_HUMANS {
  type: "EDIT_TOXICITY_HUMANS";
  toxicity: boolean;
}

interface RESET_FORM {
  type: "RESET_FORM";
  initialState: Plant;
}
export type PlantAction =
  | EDIT_NAME
  | EDIT_SPECIES
  | EDIT_IMAGE
  | ADD_LOGS
  | SET_FAVORITE
  | EDIT_LIGHT_NEED
  | EDIT_DESCRIPTION
  | EDIT_LOCATION
  | EDIT_TOXICITY
  | EDIT_WATER_FREQUENCY
  | EDIT_TOXICITY_PETS
  | EDIT_TOXICITY_HUMANS
  | RESET_FORM;
