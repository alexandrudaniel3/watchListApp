import { View, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import TitlePreview from "../components/TitlePreview";
import SavedTitle from "../components/SavedTitle";
import { useIsFocused } from "@react-navigation/native";

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
}

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
}


export default function WatchList({navigation}) {
  const [titlesData, setTitlesData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getStoredTitles(setTitlesData);
    // console.log(titlesData);
    // clearAllData();
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

    return (
      <View>
        <Text style={styles.categoryTitle}>Need To Watch:</Text>
        {toWatchList.map((title, index) => (
          <SavedTitle data={title.data} id={title.id} key={index} navigation={navigation} />
        ))}
      </View>
    )
  }

  const WatchedList = () => {
    if (titlesData.length === 0) {
      return;
    }

    const watchedList = titlesData.filter((title) => title.data.watched === true);

    if (watchedList.length === 0) {
      return;
    }

    return (
      <View>
        <Text style={styles.categoryTitle}>
          Watched:
        </Text>
        {watchedList.map((title, index) => (
          <SavedTitle data={title.data} id={title.id} key={index} navigation={navigation} />
        ))}
      </View>
    )
  }

  return (
    <View style={styles.page}>
      <Text style={styles.header}>
        Watch List
      </Text>
      <ScrollView>
        <ToWatchList />
        <WatchedList />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#2b2d30",
  },
  header: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    fontFamily: "BebasNeue-Regular",
    margin: 5,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    textAlign: "center",
  },
  categoryTitle: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 25,
    color: "white",
    marginLeft: 20,
    marginVertical: 5,
  }
})
