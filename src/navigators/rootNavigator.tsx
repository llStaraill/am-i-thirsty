import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import FabGroup, { FabAction } from "../components/layout/FabGroup";
import PlantHeader from "../components/layout/plantHeader";
import { ListScreen, SettingScreen } from "../screens";
import PlantNavigator from "./plantNavigator";

/* export type RootTabNavigatorProps = {
  Plants: { initialRouteName: "List" | "Detail" | "Edit" };
  Settings: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabNavigatorProps>(); */

export type RootStackNavigatorProps = {
  List: undefined;
  Detail: { id: number };
  Edit: { setting: "Add" | "Edit"; id: number | undefined };
  Setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorProps>();

const RootNavigator = () => {
  const [showFab, setShowFab] = useState<boolean>(true);

  //  <FabGroup showFab={showFab} fabActions={} fabGroupIcon="flower" />

  return (
    <SafeAreaView style={{ flex: 1 }} collapsable={false}>
      <PlantHeader
        title="Am I thirsty ?"
        subtitle="99 little buds in the pot"
      />
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RootNavigator;
