import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import PlantHeader from "../components/layout/plantHeader";
import { ListScreen, EditScreen, DetailScreen } from "../screens";
import { RootTabNavigatorProps } from "./rootNavigator";

export type PlantStackNavigatorProps = {
  List: undefined;
  Detail: { id: number };
  Edit: { setting: "Add" | "Edit" };
};

const Stack = createNativeStackNavigator<PlantStackNavigatorProps>();

type PlantNavigatorProps = NativeStackScreenProps<
  RootTabNavigatorProps,
  "Plants"
>;

const PlantNavigator = ({ route }: PlantNavigatorProps) => {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName={route.params.initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.id.toString() })}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          initialParams={{ setting: "Edit" }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default PlantNavigator;
