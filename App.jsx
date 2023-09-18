import Title from "./pages/Title";
import { SafeAreaView, Image } from "react-native";
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
        <Stack.Screen name="WatchListPage" component={WatchList} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    )
  };

  const DiscoverStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DiscoverPage" component={Discover} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2b2d30' }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#B11515',
          tabBarInactiveTintColor: '#CCCCCC',
          tabBarStyle: { backgroundColor: '#2b2d30', borderTopWidth: 1},
        }}>
          <Tab.Screen name="Watch List"
                        component={WatchListStack}
                        options={{
                          tabBarIcon: ({ size, focused }) => (
                            <Image
                              source={require("./assets/home_icon.png")}
                              style={{ width: size, height: size, resizeMode: "cover", tintColor: focused ? "#B11515" : "gray" }}
                            />
                          ),
                        }} />
          <Tab.Screen name="Discover"
                      component={DiscoverStack}
                      options={{
                        tabBarIcon: ({ size, focused }) => (
                          <Image
                            source={require("./assets/discover_icon.png")}
                            style={{ width: size, height: size, resizeMode: "cover", tintColor: focused ? "#B11515" : "gray" }}
                          />
                        ),
                      }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
