import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { DeviceEventEmitter, EventEmitter } from "react-native";
import { Appbar } from "react-native-paper";
import { PlantNavigatorProps } from "../../navigators/plantNavigator";
import { DetailScreenProps } from "../../screens/plants/detail";
import { EditScreenProps } from "../../screens/plants/edit";
import { ListScreenProps } from "../../screens/plants/list";

interface PlantHeaderProps<T> {
  navigatorProps: T;
  title: string;
  subtitle?: string;
  showDelete?: boolean;
  showEdit?: boolean;
}

const PlantHeader = ({
  title,
  subtitle,
  showDelete = false,
  showEdit = false,
  navigatorProps: { navigation },
}: PlantHeaderProps<
  DetailScreenProps | PlantNavigatorProps | EditScreenProps | ListScreenProps
>) => {
  const handleDeleteClicked = () => {
    DeviceEventEmitter.emit("deleteIconClicked");
  };

  const handleEditClicked = () => {
    DeviceEventEmitter.emit("editIconClicked");
  };
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} subtitle={subtitle} />
      {showEdit && (
        <Appbar.Action icon="pencil" onPress={() => handleEditClicked()} />
      )}
      {showDelete && (
        <Appbar.Action icon="delete" onPress={() => handleDeleteClicked()} />
      )}
    </Appbar.Header>
  );
};

export default PlantHeader;
