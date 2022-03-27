import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, DeviceEventEmitter } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
} from "react-native-paper";
import PlantHeader from "../../components/layout/plantHeader";
import { usePlantStore } from "../../context/plantContext";
import { database } from "../../lib/data/db";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

export type DetailScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Detail"
>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const { deletePlant } = usePlantStore();

  useEffect(() => {
    const id = route.params.id;
    database.getPlantById(id, setPlant);
    setLoading(false);
  }, []);

  const redirectOnSuccess = () => {
    return navigation.navigate("List");
  };

  const handlePlantDelete = () => {
    if (plant) {
      deletePlant(plant.id, redirectOnSuccess);
    }
  };

  const handleDeleteClicked = () => {
    setDialogVisibility(true);
  };

  const hideDialog = () => {
    setDialogVisibility(false);
  };

  DeviceEventEmitter.addListener("deleteIconClicked", handleDeleteClicked);

  return (
    <>
      <View>
        {!plant || loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Text>{`The profile of the beautiful ${plant.name} a very handsome ${plant.species}`}</Text>
            <Portal>
              <Dialog visible={dialogVisibility} onDismiss={hideDialog}>
                <Dialog.Title>
                  <Text>This is a title</Text>
                </Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{`Do you really want to delete ${plant.name}`}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setDialogVisibility(false)}>
                    Cancel
                  </Button>
                  <Button onPress={() => handlePlantDelete()}>Ok</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        )}
      </View>
    </>
  );
};

export default DetailScreen;
