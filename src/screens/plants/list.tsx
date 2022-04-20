import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { FAB, List, Portal, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePlantStore } from "../../context/plantContext";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

import AppStyles from "../../styles/global.scss";
import FabGroup from "../../components/layout/FabGroup";
import { listFabActions } from "../../lib/fabActions";

export type ListScreenProps = NativeStackScreenProps<
  PlantStackNavigatorProps,
  "List"
>;

const ListScreen = observer(({ navigation }: ListScreenProps) => {
  const { plants } = usePlantStore();
  console.log({ plants });

  return (
    <>
      <ScrollView style={AppStyles.main}>
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
        <Portal>
          <FabGroup
            showFab={true}
            fabActions={listFabActions}
            fabGroupIcon="flower"
            navigation={navigation}
          />
        </Portal>
      </ScrollView>
    </>
  );
});

export default ListScreen;
