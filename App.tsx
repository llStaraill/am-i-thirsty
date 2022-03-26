import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigators/rootNavigator";
import { PlantContextProvider } from "./src/context/plantContext";
import useDatabase from "./src/hooks/useDatabase";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaProvider>
      <PlantContextProvider>
        <PaperProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar />
          </NavigationContainer>
        </PaperProvider>
      </PlantContextProvider>
    </SafeAreaProvider>
  );
}
