import React, { useReducer, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { Button, RadioButton, TextInput, Title , Text} from "react-native-paper";
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

export type EditScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Edit"
>;



const plantReducer = (state: Plant, action: PlantAction): Plant  => {
  switch (action.type) {
    case "EDIT_NAME":
      return { ...state, ...{ name: action.name } };
    case "EDIT_SPECIES":
      return { ...state, ...{ species: action.species } };
    case "EDIT_IMAGE":
      return { ...state, ...{ image: action.image } };
    default:
     console.log("Action not implemented yet");
     return {...state}
  }
};

const initialState: Plant = {
  id: null,
  name: null,
  species: null,
  image: null,
  waterFrequency: 7,
  lightNeed: 'SHADE',
  
}


const EditScreen = observer(({ route, navigation }: EditScreenProps) => {
  
  const [state, dispatch] = useReducer(plantReducer, initialState)


  const { plants, addNewPlant } = usePlantStore();

  const redirectOnSuccess = () => {
    return navigation.navigate("List");
  };

  const handlePlantSave = () => {
    console.log("Image", state.image)
    const newPlant: Plant = {
    ...state,
    id: getId(plants)
    };

    addNewPlant(newPlant, redirectOnSuccess);
    navigation.navigate("List");
  };

  const getPhotoUri = (uri: string) => {
    dispatch({type: 'EDIT_IMAGE', image: uri })
  }


  const handleLightNeeds = (radioValue: string) => {
    const value = radioValue as "LOW" | "SHADE" | "FULL";
    
    dispatch({type:'EDIT_LIGHT_NEED', lightNeed: value})
  }

 

  return (
    <SafeAreaView style={editScreenStyling.containerWrapper}>
      <ScrollView>
        <Title>Edit Plant</Title>
        <TextInput
          label="Name"
          autoComplete={false}
          value={state.name || ''} 
          onChangeText={(text) => dispatch({type: "EDIT_NAME", name: text})}
        ></TextInput>
        <TextInput
          label="Species"
          autoComplete={false}
          value={state.species || ''}
          onChangeText={(text) => dispatch({type:'EDIT_SPECIES', species: text})}
        ></TextInput>

        <ImagePicker uri={state.image}  setPlantPhoto={getPhotoUri}/>
<View style={{flexDirection: 'row'}}>   
<RadioButton.Group onValueChange={(newValue) => handleLightNeeds(newValue)} value={state.lightNeed}>
      <View>
        <Text>First</Text>
        <RadioButton value={"LOW"}/>
      </View>
      <View>
        <Text>Second</Text>
        <RadioButton value="SHADE" />
      </View>
      <View>
        <Text>Second</Text>
        <RadioButton value="FULL" />
      </View>
    </RadioButton.Group></View>
        <Button
          mode="contained"
          disabled={!state.name || !state.species}
          onPress={() => handlePlantSave()}
        >
          Save
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
});

export default EditScreen;
