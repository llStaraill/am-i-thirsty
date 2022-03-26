import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FAB, List, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlantListCard } from "../../components";
import { PlantStackNavigatorProps } from "../../navigators/plantNavigator";

type ListScreenProps = NativeStackScreenProps<PlantStackNavigatorProps, "List">;

const ListScreen = ({ navigation }: ListScreenProps) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <List.Section>
          <List.Item
            title="First Item"
            left={() => <List.Icon icon="folder" />}
          />
          <List.Item
            title="Second Item"
            left={() => <List.Icon color="#000" icon="folder" />}
          />
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
