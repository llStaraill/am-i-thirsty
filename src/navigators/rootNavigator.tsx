import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";
import PlantHeader from "../components/layout/plantHeader";
import {
  DetailScreen,
  EditScreen,
  ListScreen,
  SettingScreen,
} from "../screens";

export type RootStackNavigatorProps = {
  List: undefined;
  Detail: { id: number };
  Edit: { setting: "Add" | "Edit"; id: number | undefined };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorProps>();

const RootNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={({ route, navigation }) => ({
          header: () => (
            <PlantHeader
              title="Am I thirsty ?"
              subtitle={
                route.name === "Settings"
                  ? "Settings"
                  : "99 little buds in the pot"
              }
              hideBackAction={route.name === "List"}
              navigatorProps={navigation}
              showDelete={route.name === "Detail"}
              showEdit={route.name === "Detail"}
            />
          ),
        })}
      >
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />

        <Stack.Screen name="Settings" component={SettingScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RootNavigator;
