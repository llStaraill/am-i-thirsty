import { PlantAction } from "../reducer";

export enum LogType {
  WATERED = "WATERED",
  REPOTTED = "REPOTTED",
  OBTAINED = "OBTAINED",
  FERTILIZED = "FERTILIZED",
  PESTS = "PESTS",
  OTHER = "OTHER",
}

export interface Log {
  type: LogType | PlantAction;
  date: Date;
  message: string;
}
