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
  Edit: { setting: "Add" | "Edit"; id: number | undefined };
};

const Stack = createNativeStackNavigator<PlantStackNavigatorProps>();

export type PlantNavigatorProps = NativeStackScreenProps<
  RootTabNavigatorProps,
  "Plants"
>;

const PlantNavigator = ({ route, navigation }: PlantNavigatorProps) => {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator initialRouteName={route.params.initialRouteName}>
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={({ route, navigation }) => ({
            header: () => (
              <PlantHeader
                navigatorProps={{ route, navigation }}
                title={route.name}
                subtitle={"99 lil buds in the pot"}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route, navigation }) => ({
            header: () => (
              <PlantHeader
                navigatorProps={{ route, navigation }}
                title={route.name}
                showDelete
                showEdit
              />
            ),
          })}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          initialParams={{ setting: "Edit" }}
          options={({ route, navigation }) => ({
            header: () => (
              <PlantHeader
                navigatorProps={{ route, navigation }}
                title={route.name}
                subtitle={
                  route.params.setting === "Edit"
                    ? "Edit Plant"
                    : "Create new Plant"
                }
              />
            ),
          })}
        />
      </Stack.Navigator>
    </View>
  );
};

export default PlantNavigator;
