import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Appbar, Caption } from "react-native-paper";
import { PlantListCard } from "../../components";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type DetailScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "Detail"
>;

const DetailScreen = () => {
  return (
    <View>
      <Appbar>
        <Appbar.Action
          icon="archive"
          onPress={() => console.log("Pressed archive")}
        />
        <Appbar.Action
          icon="mail"
          onPress={() => console.log("Pressed mail")}
        />
        <Appbar.Action
          icon="label"
          onPress={() => console.log("Pressed label")}
        />
        <Appbar.Action
          icon="delete"
          onPress={() => console.log("Pressed delete")}
        />
      </Appbar>
    </View>
  );
};

export default DetailScreen;
