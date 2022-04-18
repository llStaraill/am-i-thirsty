import React, { useReducer, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import {
  Button,
  RadioButton,
  TextInput,
  Title,
  Divider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import { usePlantStore } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";
import { editScreenStyling } from "../../styles/screens.ts";
import { ImagePicker } from "../../components";

import { getId } from "../../lib/helper";
import { PlantAction } from "../../types/reducer";
import { View } from "react-native";
import { Log, LogType } from "../../types/logs";

export type EditScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Edit"
>;

const plantReducer = (state: Plant, action: PlantAction): Plant => {
  switch (action.type) {
    case "EDIT_NAME":
      return { ...state, name: action.name };
    case "EDIT_SPECIES":
      return { ...state, species: action.species };
    case "EDIT_IMAGE":
      return { ...state, image: action.image };
    case "EDIT_DESCRIPTION":
      return { ...state, description: action.description };
    case "EDIT_LIGHT_NEED":
      return { ...state, lightNeed: action.lightNeed };
    case "EDIT_TOXICITY":
      return { ...state, toxicity: action.toxicity };
    case "EDIT_LOCATION":
      return { ...state, location: action.location };
    case "EDIT_WATER_FREQUENCY":
      return { ...state, waterFrequency: action.waterFrequency };
    case "RESET_FORM":
      return { ...initialState };
    default:
      console.log("Action not implemented yet");
      return { ...state };
  }
};

const initialState: Plant = {
  id: 0,
  name: "",
  species: "",
  image: "",
  waterFrequency: 7,
  lightNeed: "SHADE",
  toxicity: "NON_TOXIC",
  description: "",
  location: "",
  logs: [],
};

const EditScreen = observer(({ route, navigation }: EditScreenProps) => {
  const [state, dispatch] = useReducer(plantReducer, initialState);

  const { plants, addNewPlant } = usePlantStore();

  const redirectOnSuccess = () => {
    return navigation.navigate("List");
  };

  const handlePlantSave = () => {
    console.log("Image", state.image);
    const log: Log = {
      type: LogType.OBTAINED,
      date: new Date(),
      message: `${state.name} (${state.species} has been created)`,
    };

    const newPlant: Plant = {
      ...state,
      id: getId(plants),
    };

    newPlant.logs.push(log);

    addNewPlant(newPlant, redirectOnSuccess);
    navigation.navigate("List");
  };

  const getPhotoUri = (uri: string) => {
    dispatch({ type: "EDIT_IMAGE", image: uri });
  };

  const handleLightNeeds = (radioValue: string) => {
    const value = radioValue as "LOW" | "SHADE" | "FULL";

    dispatch({ type: "EDIT_LIGHT_NEED", lightNeed: value });
  };

  const handleToxicity = (radioValue: string) => {
    const value = radioValue as
      | "NON_TOXIC"
      | "TOXIC_TO_PETS"
      | "TOXIC_TO_HUMANS";

    dispatch({ type: "EDIT_TOXICITY", toxicity: value });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        ...editScreenStyling.containerWrapper,
      }}
    >
      <ScrollView>
        <Title>Edit Plant</Title>

        <ImagePicker uri={state.image} setPlantPhoto={getPhotoUri} />
        <TextInput
          label="Name"
          autoComplete={false}
          value={state.name || ""}
          onChangeText={(text) => dispatch({ type: "EDIT_NAME", name: text })}
        />

        <TextInput
          label="Species"
          autoComplete={false}
          value={state.species || ""}
          onChangeText={(text) =>
            dispatch({ type: "EDIT_SPECIES", species: text })
          }
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexBasis: "50%", borderRightWidth: 1 }}>
            <RadioButton.Group
              key="Light"
              onValueChange={(newValue) => handleLightNeeds(newValue)}
              value={state.lightNeed}
            >
              <RadioButton.Item label="Low Sun" value="LOW" />
              <RadioButton.Item label="Shade" value="SHADE" />
              <RadioButton.Item label="Full sun" value="FULL" />
            </RadioButton.Group>
          </View>
          <View style={{ flexBasis: "50%" }}>
            <RadioButton.Group
              key="Toxicity"
              onValueChange={(newValue) => handleToxicity(newValue)}
              value={state.toxicity}
            >
              <RadioButton.Item label="Non Toxic" value="NON_TOXIC" />
              <RadioButton.Item label="Toxic to pets" value="TOXIC_TO_PETS" />
              <RadioButton.Item label="Toxic" value="TOXIC_TO_HUMANS" />
            </RadioButton.Group>
          </View>
        </View>
        <NumericInput
          onChange={(number) =>
            dispatch({ type: "EDIT_WATER_FREQUENCY", waterFrequency: number })
          }
        />
        <Divider />
        <TextInput
          style={{ minHeight: 150 }}
          label="Description"
          autoComplete={false}
          multiline
          value={state.description || ""}
          onChangeText={(text) =>
            dispatch({ type: "EDIT_DESCRIPTION", description: text })
          }
        />
        <TextInput
          label="Location"
          autoComplete={true}
          value={state.location || ""}
          onChangeText={(text) =>
            dispatch({ type: "EDIT_SPECIES", species: text })
          }
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            width: "100%",
          }}
        >
          <Button
            style={{ flexBasis: "30%" }}
            mode="outlined"
            onPress={() => handlePlantSave()}
          >
            Reset
          </Button>
          <Button
            style={{ flexBasis: "70%", marginLeft: 5 }}
            mode="contained"
            disabled={!state.name || !state.species}
            onPress={() => handlePlantSave()}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default EditScreen;
