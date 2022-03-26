import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Button, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantContext } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type EditScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "Edit">;

const EditScreen = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  const { plants, addNewPlant } = useContext(PlantContext);

  const handlePlantSave = () => {
    const newPlant: Plant = {
      id:
        plants.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1,
      name,
      species,
    };

    addNewPlant(newPlant);
  };

  return (
    <SafeAreaView>
      <Title>Edit Plant</Title>
      <TextInput
        label="Name"
        autoComplete={false}
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <TextInput
        label="Species"
        autoComplete={false}
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
