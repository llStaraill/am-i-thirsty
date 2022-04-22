import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Section from "../../components/global/section";
import React, { useEffect, useState } from "react";
import { SafeAreaView, DeviceEventEmitter, Image, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Subheading,
  Text,
  Title,
} from "react-native-paper";
import { usePlantStore } from "../../context/plantContext";
import { database } from "../../lib/data/db";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

import style from "./detail.scss";
import globalStyle from "../../styles/global.scss";
import ToxicityIndicator from "../../components/plants/detail/ToxicityIndicator";

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
      <View>
        {!plant || loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <View>
              {plant.image && plant.image !== "" && (
                <Image
                  style={style["detailScreen__cover"]}
                  source={{ uri: plant.image, width: 300, height: 300 }}
                />
              )}
              <View style={style["detailScreen__header"]}>
                <Title style={style["detailScreen__header__title"]}>
                  {plant.name}
                </Title>
                <Subheading style={style["detailScreen__header__subheading"]}>
                  {plant.species}
                </Subheading>
              </View>
            </View>
            <View style={style["detailScreen__information"]}>
              <ToxicityIndicator toxicity={plant.toxicity} />
            </View>
            <Section headline="Description">
              <Text>{plant.description} I am a description</Text>
            </Section>
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
      </View>
    </>
  );
};

export default DetailScreen;
