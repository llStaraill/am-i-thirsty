import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Card,
  FAB,
  List,
  Portal,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlantStore } from "../../context/plantContext";
import { Plant } from "../../lib/data/model/plants";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";
import { listScreenStyling } from "../../styles/screens.ts";

export type ListScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "List"
>;

const ListScreen = observer(({ navigation }: ListScreenProps) => {
  const { plants } = usePlantStore();

  const renderPlants = ({ item: { id, name, species } }: any) => {
    console.log;
    return (
      <Card
        key={id}
        style={{ flex: 1, margin: 5 }}
        onPress={() => navigation.navigate("Detail", { id })}
      >
        <Card.Content>
          <Title>{name}</Title>
        </Card.Content>
        <Card.Cover
          style={{ flexShrink: 1, maxHeight: "auto" }}
          source={{ uri: `https://picsum.photos/700?random=${id}` }}
          height={100}
          width={100}
          resizeMode={"cover"}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, ...listScreenStyling.containerWrapper }}>
      <FlatList
        style={{ flex: 1 }}
        data={plants}
        numColumns={2}
        renderItem={renderPlants}
        extraData={plants}
      />

      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 25, right: 16 }}
        onPress={() =>
          navigation.navigate("Edit", { setting: "Add", id: undefined })
        }
      />
    </SafeAreaView>
  );
});

export default ListScreen;
