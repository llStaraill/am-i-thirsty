import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { usePlantStore } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";
import { editScreenStyling } from "../../styles/screens.ts";
import { ImagePicker } from "../../components";

import { getId } from "../../lib/helper";
import { PlantAction } from "../../types/reducer";

export type EditScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Edit"
>;

interface PlantState {
  name: string;
  species: string;
  image: unknown;
}

const plantReducer = (state: PlantState, action: PlantAction) => {
  switch (action.type) {
    case "EDIT_NAME":
      return { ...state, ...{ name: action.name } };
    case "EDIT_SPECIES":
      return { ...state, ...{ species: action.species } };
    case "EDIT_IMAGE":
      return { ...state, ...{ image: action.image } };
    default:
      return console.log("Action not implemented yet");
  }
};

const EditScreen = observer(({ route, navigation }: EditScreenProps) => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [photo, setPhoto] = useState<any>(null);

  const { plants, addNewPlant } = usePlantStore();

  const redirectOnSuccess = () => {
    return navigation.navigate("List");
  };

  const handlePlantSave = () => {
    const newPlant: Plant = {
      id: getId(plants),
      name,
      species,
    };

    addNewPlant(newPlant, redirectOnSuccess);
    navigation.navigate("List");
  };

  return (
    <SafeAreaView style={editScreenStyling.containerWrapper}>
      <ScrollView>
        <Title>Edit Plant</Title>
        <TextInput
          label="Name"
          autoComplete={false}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          label="Species"
          autoComplete={false}
          value={species}
          onChangeText={(text) => setSpecies(text)}
        ></TextInput>

        <ImagePicker />

        <Button
          mode="contained"
          disabled={name === "" && species === ""}
          onPress={() => handlePlantSave()}
        >
          Save
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
});

export default EditScreen;
