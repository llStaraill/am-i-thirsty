import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { View, Text } from "react-native";
import { Button, FAB, Portal } from "react-native-paper";
import { PlantListCard } from "../components";
import { SettingScreen } from "../screens";
import PlantNavigator from "./plantNavigator";

export type RootTabNavigatorProps = {
  Plants: { initialRouteName: "List" | "Detail" | "Edit" };
  Settings: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabNavigatorProps>();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Plants"
      shifting={true}
      backBehavior="initialRoute"
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Plants"
        component={PlantNavigator}
        options={{ tabBarIcon: "flower" }}
        initialParams={{ initialRouteName: "List" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ tabBarIcon: "cog" }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
