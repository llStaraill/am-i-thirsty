import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantListCard } from "../../components";
import { PlantContext } from "../../context/plantContext";
import { addPlant, fetchPlants, openDatabase } from "../../lib/data/db";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type EditScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "Edit">;

const EditScreen = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  const { db } = useContext(PlantContext);

  const handlePlantSave = () => {
    try {
      const plantList = fetchPlants(db);
      console.log(plantList);

      const getId = () => {
        if (plantList.length > 0) {
          return (
            plantList.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1
          );
        } else return 1;
      };

      const newPlant: Plant = {
        id: getId(),
        name: name,
        species: species,
      };

      //addPlant(db, newPlant);
    } catch (error) {
      console.error(error);
    }
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
