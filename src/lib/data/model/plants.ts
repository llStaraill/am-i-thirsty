export type Plant = {
  id: number | null;
  name: string | null;
  species: string | null;
  image: string | null;
  lightNeed: 'LOW' | 'SHADE' | 'FULL';
  waterFrequency: number;

};
