import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, List, Portal, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlantStore } from "../../context/plantContext";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";
import { listScreenStyling } from "../../styles/screens.ts";

export type ListScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "List"
>;

const ListScreen = observer(({ navigation }: ListScreenProps) => {
  const { plants } = usePlantStore();

  return (
    <SafeAreaView style={{ flex: 1, ...listScreenStyling.containerWrapper }}>
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
