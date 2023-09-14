import Title from "./pages/Title";
import { SafeAreaView } from "react-native";
import TitlePreview from "./components/TitlePreview";
import Discover from "./pages/Discover";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WatchList from "./pages/WatchList";

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const WatchListStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WatchList" component={WatchList} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    )
  };

  const DiscoverStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Tab.Screen name="WatchListStack" component={WatchListStack} />
          <Tab.Screen name="DiscoverStack" component={DiscoverStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
