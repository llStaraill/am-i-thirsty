import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";

export interface FabAction {
  icon: string;
  label: string;
  onPress: () => void;
  small: boolean;
}

interface FabGroupProps {
  showFab: boolean;
  fabActions: FabAction[];
  fabGroupIcon: string;
  navigation: any;
}

const FabGroup = ({ showFab, fabActions, fabGroupIcon }: FabGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Provider>
      <FAB.Group
        open={open}
        icon={open ? "close" : fabGroupIcon}
        visible={showFab}
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
