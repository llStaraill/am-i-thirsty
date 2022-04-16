export type Plant = {
  id: number | null;
  name: string | null;
  species: string | null;
  image: string | null;
  lightNeed: 'LOW' | 'SHADE' | 'FULL';
  toxicity: "NON_TOXIC" | "TOXIC_TO_PETS" | "TOXIC_TO_HUMANS";
  waterFrequency: number;
  description: string;


};


