import React from "react";
import { DeviceEventEmitter, EventEmitter } from "react-native";
import { Appbar } from "react-native-paper";
import { DetailScreenProps } from "../../screens/plants/detail";

interface PlantHeaderProps {
  navigatorProps: DetailScreenProps;
  title: string;
  species: string;
}

const PlantHeader = ({
  title,
  species,
  navigatorProps: { navigation },
}: PlantHeaderProps) => {
  const handleDeleteClicked = () => {
    DeviceEventEmitter.emit("deleteClicked");
  };
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} subtitle={species} />
      <Appbar.Action icon="trashcan" onPress={() => handleDeleteClicked()} />
    </Appbar.Header>
  );
};

export default PlantHeader;
