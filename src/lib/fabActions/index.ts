import { FabAction } from "../../components/layout/FabGroup";

const goToNewPlant: FabAction = {
  icon: "flower-outline",
  label: "Add new plant",
  onPress: () => console.log("Plantaction"),
  small: false,
};

const goToSettings: FabAction = {
  icon: "cogs",
  label: "Settings",
  onPress: () => console.log("go to settings"),
  small: true,
};

const savePlant: FabAction = {
  icon: "save",
  label: "save",
  onPress: () => console.log("Saving"),
  small: false,
};

const listFabActions: FabAction[] = [goToSettings, goToNewPlant];

const editFabActions: FabAction[] = [goToSettings, savePlant];

export { listFabActions };
