import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Paragraph, Portal, Title } from "react-native-paper";

import { usePlantStore } from "../../context/plantContext";

import globalStyles from "../../styles/global.scss";
import { RootStackNavigatorProps } from "../../navigators/rootNavigator";
import { View } from "react-native";
import { PlantListCard } from "../../components";
import style from "./list.scss";
import FabGroup from "../../components/layout/FabGroup";

export type ListScreenProps = NativeStackScreenProps<
  RootStackNavigatorProps,
  "List"
>;

const ListScreen = observer(({ route, navigation }: ListScreenProps) => {
  const { plants } = usePlantStore();

  const [showFab, setShowFab] = useState<boolean>(true);

  useEffect(() => {
    navigation.addListener("focus", () => setShowFab(true));
    navigation.addListener("blur", () => {
      setShowFab(false);
    });

    return () => {
      navigation.removeListener("focus", () => setShowFab(true));
      navigation.removeListener("blur", () => {
        setShowFab(false);
      });
    };
  }, []);

  return (
    <ScrollView style={globalStyles.main}>
      <Title>All my little blossoms</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Paragraph>
      <View style={style["listScreen__list"]}>
        {plants.map((plant) => (
          <PlantListCard
            key={plant.id}
            plant={plant}
            onPress={() => navigation.navigate("Detail", { id: plant.id })}
          />
        ))}
      </View>

      <Portal>
        <FabGroup navigation={navigation} showFabGroup={showFab} />
      </Portal>
    </ScrollView>
  );
});

export default ListScreen;
