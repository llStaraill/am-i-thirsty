import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, DeviceEventEmitter } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Text,
} from "react-native-paper";
import PlantHeader from "../../components/layout/plantHeader";
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

  useEffect(() => {
    const id = route.params.id;
    database.getPlantById(id, setPlant);
    setLoading(false);
  }, []);

  const handlePlantDelete = () => {
    if (plant) {
      console.log(`Deleting plant with id ${plant.id}`);
    }
  };
  const handleDeleteClicked = () => {
    setDialogVisibility(true);
  };

  const hideDialog = () => {
    setDialogVisibility(false);
  };

  DeviceEventEmitter.addListener("deleteClicked", handleDeleteClicked);

  return (
    <>
      <View>
        {!plant || loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <PlantHeader
              navigatorProps={{ route, navigation }}
              title={plant.name}
              species={plant.species}
            />
            <Text>{`The profile of the beautiful ${plant.name} a very handsome ${plant.species}`}</Text>
            <Dialog visible={dialogVisibility} onDismiss={hideDialog}>
              <Dialog.Title>
                <Text>This is a title</Text>
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph>{`Do you really want to delete ${plant.name}`}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => console.log("Cancel")}>Cancel</Button>
                <Button onPress={() => handlePlantDelete}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </>
        )}
      </View>
    </>
  );
};

export default DetailScreen;
