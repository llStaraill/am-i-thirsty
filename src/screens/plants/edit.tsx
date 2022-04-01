import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { View, Image } from "react-native";
import {
  Button,
  IconButton,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { usePlantStore } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";
import { editScreenStyling } from "../../styles/screens.ts";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ImagePicker } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

export type EditScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Edit"
>;

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
