import Title from "./pages/Title";
import { SafeAreaView } from "react-native";
import TitlePreview from "./components/TitlePreview";
import Discover from "./pages/Discover";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {

  const Stack = createStackNavigator();

  const DiscoverStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Discover' component={Discover} />
        <Stack.Screen name='Title' component={Title} />
      </Stack.Navigator>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <DiscoverStack />
      </NavigationContainer>
    </SafeAreaView>
  )
}
