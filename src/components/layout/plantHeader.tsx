import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { RootStackNavigatorProps } from "navigators/rootNavigator";
import React from "react";
import { DeviceEventEmitter, EventEmitter } from "react-native";
import { Appbar } from "react-native-paper";
import { PlantNavigatorProps } from "../../navigators/plantNavigator";
import { DetailScreenProps } from "../../screens/plants/detail";
import { EditScreenProps } from "../../screens/plants/edit";
import { ListScreenProps } from "../../screens/plants/list";
import { SettingScreenProps } from "../../screens/settings";

interface PlantHeaderProps {
  navigatorProps?: any;
  title: string;
  subtitle?: string;
  showDelete?: boolean;
  showEdit?: boolean;
  hideBackAction?: boolean;
}

const PlantHeader = ({
  title,
  subtitle,
  showDelete = false,
  showEdit = false,
  hideBackAction = false,
  navigatorProps,
}: PlantHeaderProps) => {
  const handleDeleteClicked = () => {
    DeviceEventEmitter.emit("deleteIconClicked");
  };

  const handleEditClicked = () => {
    DeviceEventEmitter.emit("editIconClicked");
  };
  return (
    <Appbar.Header>
      {!hideBackAction && navigatorProps && (
        <Appbar.BackAction onPress={() => navigatorProps.goBack()} />
      )}
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
