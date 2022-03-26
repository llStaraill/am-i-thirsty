import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, List, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantListCard } from "../../components";
import { PlantContext } from "../../context/plantContext";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type ListScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "List">;

const ListScreen = ({ navigation }: ListScreenProps) => {
  const { plants } = useContext(PlantContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <List.Section>
          {plants.map(({ id, name, species }) => (
            <List.Item
              key={id}
              title={name}
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
};

export default ListScreen;
