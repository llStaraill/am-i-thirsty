import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PlantHeader from "../components/layout/plantHeader";

import { RootTabNavigatorProps } from "../navigators/rootNavigator";
import { settingScreenStyling } from "../styles/screens.ts";

export type SettingScreenProps = NativeStackScreenProps<
  RootTabNavigatorProps,
  "Settings"
>;

const SettingScreen = () => {
  return (
    <SafeAreaView style={settingScreenStyling.containerWrapper}>
      <Text>Lemon</Text>
      <Divider />
      <Text>Mango</Text>
      <Divider />
    </SafeAreaView>
  );
};

export default SettingScreen;
