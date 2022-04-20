import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FAB, Provider } from "react-native-paper";
import { RootStackNavigatorProps } from "../../navigators/rootNavigator";

export interface FabAction {
  icon: string;
  label: string;
  onPress: () => void;
  small: boolean;
}

interface FabGroupProps {
  navigation: NativeStackNavigationProp<RootStackNavigatorProps, "List">;
  showFabGroup: boolean;
}

const FabGroup = ({ navigation, showFabGroup = false }: FabGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const fabActions: FabAction[] = [
    {
      icon: "cogs",
      label: "Settings",
      onPress: () => navigation.navigate("Settings"),
      small: true,
    },
    {
      icon: "flower-outline",
      label: "Add new plant",
      onPress: () =>
        navigation.navigate("Edit", { setting: "Add", id: undefined }),
      small: false,
    },
  ];

  return (
    <Provider>
      <FAB.Group
        open={open}
        icon={open ? "close" : "flower"}
        visible={showFabGroup}
        actions={fabActions}
        onStateChange={() => setOpen(!open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Provider>
  );
};

export default FabGroup;
