import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import PlantHeader from "../components/layout/plantHeader";
import { SettingScreen } from "../screens";
import PlantNavigator from "./plantNavigator";

export type RootTabNavigatorProps = {
  Plants: { initialRouteName: "List" | "Detail" | "Edit" };
  Settings: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabNavigatorProps>();

const RootNavigator = () => {
  return (
    <>
      <PlantHeader
        title="Am I thirsty ?"
        subtitle="99 little buds in the pot"
        hideBackAction
      />
      <Tab.Navigator
        initialRouteName="Plants"
        shifting={true}
        backBehavior="initialRoute"
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Plants"
          component={PlantNavigator}
          options={() => ({
            tabBarIcon: "flower",
          })}
          initialParams={{ initialRouteName: "List" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={() => ({
            tabBarIcon: "cog",
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default RootNavigator;
