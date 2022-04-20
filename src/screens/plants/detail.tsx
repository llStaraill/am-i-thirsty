import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, DeviceEventEmitter, Image } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
} from "react-native-paper";
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
    if (plant && plant.id) {
      deletePlant(plant.id, redirectOnSuccess);
    }
  };

  const handleDeleteClicked = () => {
    setDialogVisibility(true);
  };

  DeviceEventEmitter.addListener("deleteIconClicked", handleDeleteClicked);

  return (
    <>
      <SafeAreaView>
        {!plant || loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            {plant.image && plant.image !== "" && (
              <Image source={{ uri: plant.image, width: 300, height: 300 }} />
            )}
            <Text>{`The profile of the beautiful ${plant.name} a very handsome ${plant.species}`}</Text>
            <Portal>
              <Dialog visible={dialogVisibility}>
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
      </SafeAreaView>
    </>
  );
};

export default DetailScreen;
