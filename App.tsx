import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigators/rootNavigator";
import { PlantProvider } from "./src/context/";

export default function App() {
  return (
    <SafeAreaProvider>
      <PlantProvider>
        <PaperProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar />
          </NavigationContainer>
        </PaperProvider>
      </PlantProvider>
    </SafeAreaProvider>
  );
}
