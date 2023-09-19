import { View, StyleSheet, Text, ScrollView, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import TitlePreview from "../components/TitlePreview";
import SavedTitle from "../components/SavedTitle";
import { useIsFocused } from "@react-navigation/native";
import { SimpleGrid } from "react-native-super-grid";

const getStoredTitles = async (setTitlesData) => {
  let titlesIDs = [];
  let titlesData = [];

  try {
    titlesIDs = await AsyncStorage.getAllKeys();
    for (let titleID of titlesIDs) {
      let titleData = await AsyncStorage.getItem(titleID);
      titlesData.push(
        {
          id: titleID,
          data: await JSON.parse(titleData),
        },
      );
    }
    setTitlesData(titlesData);
  } catch (e) {

  }
};

const clearAllData = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {

  }

  if (keys.length > 0) {
    await AsyncStorage.multiRemove(keys);
    console.log("removed");
  }
};


export default function WatchList({ navigation }) {
  const [titlesData, setTitlesData] = useState([]);
  const [displayMode, setDisplayMode] = useState("list");
  const isFocused = useIsFocused();

  useEffect(() => {
    getStoredTitles(setTitlesData);
  }, []);

  useEffect(() => {
    if (isFocused === true) {
      getStoredTitles(setTitlesData);
    }
  }, [isFocused]);
  const ToWatchList = () => {
    if (titlesData.length === 0) {
      return;
    }

    const toWatchList = titlesData?.filter((title) => title.data.watched === false);

    if (toWatchList.length === 0) {
      return;
    }

    if (displayMode === 'list') {
      return (
        <View style={{elevation: 10}}>
          <Text style={styles.categoryTitle}>Need To Watch:</Text>
          {toWatchList.map((title, index) => (
            <SavedTitle data={title.data} id={title.id} key={index} navigation={navigation} displayMode={displayMode}/>
          ))}
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.categoryTitle}>Need To Watch:</Text>
        <SimpleGrid data={toWatchList}
                    itemDimension={110}
                    renderItem={({ item }) => (<SavedTitle data={item.data} id={item.id} navigation={navigation} displayMode={displayMode}/>)} />
      </View>
    );
  };

  const WatchedList = () => {
    if (titlesData.length === 0) {
      return;
    }

    const watchedList = titlesData.filter((title) => title.data.watched === true);

    if (watchedList.length === 0) {
      return;
    }

    if (displayMode === 'list') {
      return (
        <View>
          <Text style={styles.categoryTitle}> Watched: </Text>
          {watchedList.map((title, index) => (
            <SavedTitle data={title.data} id={title.id} key={index} navigation={navigation} displayMode={displayMode}/>
          ))}
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.categoryTitle}>Watched: </Text>
        <SimpleGrid data={watchedList}
                    itemDimension={110}
                    renderItem={({ item }) => (<SavedTitle data={item.data} id={item.id} navigation={navigation} displayMode={displayMode}/>)} />
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          W<Text style={styles.headerSmallerText}>atch</Text>B<Text style={styles.headerSmallerText}>ucket</Text>
        </Text>
        <Pressable
          style={styles.displayButton}
          onPress={() => {
            if (displayMode === "list") {
              setDisplayMode("grid");
            } else {
              setDisplayMode("list");
            }
          }}
        >
          {displayMode === "list" ? <Image style={styles.displayButtonImage} source={require("../assets/grid_icon.png")}
                                           alt={"displayGrid"} /> :
            <Image style={styles.displayButtonImage} source={require("../assets/list_icon.png")} alt={"displayGrid"} />}
        </Pressable>
      </View>
      <ScrollView>
        {titlesData.length === 0 ? <Text style={styles.noTitles}>You haven't added any titles to your watch list yet! </Text> : null}
        <ToWatchList />
        <WatchedList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#2b2d30",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 20,
    margin: 5,
    height: 60,
  },
  headerText: {
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 55,
    color: "white",
    fontFamily: "BebasNeue-Regular",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    textAlign: "left",
  },
  headerSmallerText: {
    fontSize: 45,
  },
  displayButton: {
    margin: 5,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#6c6f75",
    borderRadius: 50,
  },
  displayButtonImage: {
    width: 30,
    height: 30,
    alignSelf: "center",
    tintColor: "#2b2d30",
  },
  categoryTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 25,
    color: "white",
    marginLeft: 20,
    marginVertical: 5,
  },
  noTitles: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: "white",
    margin: 10,
    textAlign: "center",
  },
});
