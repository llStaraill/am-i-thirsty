import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Divider, Paragraph, Subheading } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PlantHeader from "../components/layout/plantHeader";

export type SettingScreenProps = NativeStackScreenProps<
  RootTabNavigatorProps,
  "Settings"
>;

const SettingScreen = () => {
  return (
    <SafeAreaView>
      <Subheading>Version</Subheading>
      <Paragraph>0.0.1</Paragraph>
      <Divider />
      <Text>Mango</Text>
      <Divider />
    </SafeAreaView>
  );
};

export default SettingScreen;
