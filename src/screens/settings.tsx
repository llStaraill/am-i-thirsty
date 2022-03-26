import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootTabNavigatorProps } from "../navigators/rootNavigator";

type SettingScreenProps = NativeStackScreenProps<
  RootTabNavigatorProps,
  "Settings"
>;

const SettingScreen = ({ navigation }: SettingScreenProps) => {
  return (
    <SafeAreaView>
      <Text>Lemon</Text>
      <Divider />
      <Text>Mango</Text>
      <Divider />
    </SafeAreaView>
  );
};

export default SettingScreen;
