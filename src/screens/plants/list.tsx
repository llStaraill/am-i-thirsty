import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, List, Portal, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlantStore } from "../../context/plantContext";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type ListScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "List">;

const ListScreen = observer(({ navigation }: ListScreenProps) => {
  const { plants } = usePlantStore();

  return (
    <SafeAreaView>
      <ScrollView>
        <Title>I am a List</Title>
        <List.Section>
          {plants.map(({ id, name, species }) => (
            <List.Item
              onPress={() => navigation.navigate("Detail", { id })}
              key={id}
              title={`#${id} - ${name} (Art: ${species})`}
              left={() => <List.Icon icon="flower" />}
            />
          ))}
        </List.Section>
      </ScrollView>
      <Portal>
        <FAB
          icon="plus"
          style={{ position: "absolute", bottom: 75, right: 16 }}
          onPress={() => navigation.navigate("Edit", { setting: "Add" })}
        />
      </Portal>
    </SafeAreaView>
  );
});

export default ListScreen;
