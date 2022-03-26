import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantListCard } from "../../components";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type EditScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "Edit">;

const EditScreen = () => {
  const [name, setName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

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
    </SafeAreaView>
  );
};

export default EditScreen;
