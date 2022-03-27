import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Button, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantContext } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type EditScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "Edit">;

const getId = (plants: Plant[]) => {
  let id = 0;
  if (plants.length > 0) {
    id =
      plants.reduce((acc, cur) => {
        if (cur.id > acc.id) return cur;
        return acc;
      }).id + 1;
  }
  return id;
};

const EditScreen = ({ navigation }: EditScreenProps) => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  const { plants, addNewPlant } = useContext(PlantContext);

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
  };

  return (
    <SafeAreaView>
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
      <Button
        disabled={name === "" && species === ""}
        onPress={() => handlePlantSave()}
      >
        Save
      </Button>
    </SafeAreaView>
  );
};

export default EditScreen;
