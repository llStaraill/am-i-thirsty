import { Log } from "../../../types/logs";

export type Plant = {
  id: number;
  name: string;
  species: string;
  image: string;
  lightNeed: "LOW" | "SHADE" | "FULL";
  toxicity: Toxicity;
  waterFrequency: number;
  description: string;
  location: string;
  favorite: 0 | 1;
  logs: Log[];
};

export interface Toxicity {
  pets: boolean;
  humans: boolean;
}
