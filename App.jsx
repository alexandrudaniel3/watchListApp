import Title from "./pages/Title";
import { SafeAreaView, Image, Text, View, StatusBar } from "react-native";
import TitlePreview from "./components/TitlePreview";
import Discover from "./pages/Discover";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WatchList from "./pages/WatchList";

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const WatchListStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: "#2b2d30" } }}>
        <Stack.Screen name="WatchListPage" component={WatchList} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    );
  };

  const DiscoverStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false, cardStyle: { backgroundColor: "#2b2d30" },
      }}>
        <Stack.Screen name="DiscoverPage" component={Discover} />
        <Stack.Screen name="Title" component={Title} />
      </Stack.Navigator>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#2b2d30" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2b2d30" }}>
        <StatusBar backgroundColor={"#2b2d30"} barStyle={'light-content'}/>
        <NavigationContainer theme={DarkTheme}>
          <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: "2b2d30" }}
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#B11515",
              tabBarInactiveTintColor: "#CCCCCC",
              tabBarStyle: { backgroundColor: "#2b2d30", borderTopWidth: 1, height: 65 },
            }}>
            <Tab.Screen name="Watch List"
                        component={WatchListStack}
                        options={{
                          tabBarLabel: ({ focused }) => (
                            <Text style={{
                              fontSize: 16,
                              fontFamily: "Lato-Bold",
                              fontWeight: "bold",
                              color: focused ? "#B11515" : "gray",
                              marginBottom: 5,
                            }}>
                              Watch List
                            </Text>
                          ),
                          tabBarIcon: ({ size, focused }) => (
                            <Image
                              source={require("./assets/home_icon.png")}
                              style={{
                                width: size,
                                height: size,
                                resizeMode: "cover",
                                tintColor: focused ? "#B11515" : "gray",
                              }}
                            />
                          ),
                        }} />
            <Tab.Screen name="Discover"
                        component={DiscoverStack}
                        options={{
                          tabBarLabel: ({ focused }) => (
                            <Text style={{
                              fontSize: 16,
                              fontFamily: "Lato-Bold",
                              fontWeight: "bold",
                              color: focused ? "#B11515" : "gray",
                              marginBottom: 5,
                            }}>
                              Discover
                            </Text>
                          ),
                          tabBarIcon: ({ size, focused }) => (
                            <Image
                              source={require("./assets/discover_icon.png")}
                              style={{
                                width: size,
                                height: size,
                                resizeMode: "cover",
                                tintColor: focused ? "#B11515" : "gray",
                              }}
                            />
                          ),
                        }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}
