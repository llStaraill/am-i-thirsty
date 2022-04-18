import { Log } from "../../../types/logs";

export type Plant = {
  id: number ;
  name: string ;
  species: string ;
  image: string ;
  lightNeed: 'LOW' | 'SHADE' | 'FULL';
  toxicity: "NON_TOXIC" | "TOXIC_TO_PETS" | "TOXIC_TO_HUMANS";
  waterFrequency: number;
  description: string;
  location: string;
  logs: Log[]


};


