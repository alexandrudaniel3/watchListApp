import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator, Linking, ScrollView, Share } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";

const getTitleData = async (titleID, setTitleData, setLoading) => {
  try {
    const response = await fetch("https://www.omdbapi.com/?apikey=7f2f41c3&i=" + titleID + "&plot=full");
    const data = await response.json();
    setTitleData(data);
    setLoading(false);
  } catch (e) {
  }
};

const getWatchedStatus = async (titleID, setInWatchList, setWatched) => {
  const isInWatchList = await AsyncStorage.getItem(titleID);
  if (!isInWatchList) {
    setInWatchList(false);
    return;
  } else {
    setInWatchList(true);
    const storedData = JSON.parse(isInWatchList);
    if (storedData.watched === true) {
      setWatched(true);
    }
  }
};

const addToWatchList = async (titleID, titleData, setInWatchList) => {
  await AsyncStorage.setItem(titleID, JSON.stringify({
    watched: false,
    title: titleData.Title,
    imageSource: titleData.Poster,
  }));
  setInWatchList(true);
};

const removeFromWatchList = async (titleID, setInWatchList, setWatched) => {
  await AsyncStorage.removeItem(titleID);
  setInWatchList(false);
  setWatched(false);
};

const setWatchStatus = async (titleID, setWatched, titleData, status) => {
  await AsyncStorage.setItem(titleID, JSON.stringify({
      watched: status,
      title: titleData.Title,
      imageSource: titleData.Poster,
    },
  ));
  setWatched(status);
};


export default function Title({ route }) {

  const { titleID } = route.params;
  const [titleData, setTitleData] = useState({});
  const [inWatchList, setInWatchList] = useState(false);
  const [watched, setWatched] = useState(false);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getTitleData(titleID, setTitleData, setLoading);
    getWatchedStatus(titleID, setInWatchList, setWatched);
  }, []);

  useEffect(() => {
    getWatchedStatus(titleID, setInWatchList, setWatched);
  }, [isFocused]);

  const WatchListButtons = () => {
    if (inWatchList) {
      if (watched) {
        return (
          <View style={styles.watchListButtonsContainer}>
            <Pressable style={styles.watchListButton}
                       onPress={() => setWatchStatus(titleID, setWatched, titleData, false)}>
              <Text style={styles.watchListButtonText}>Unmark As Watched</Text>
            </Pressable>
            <Pressable style={styles.removeWatchListButton}
                       onPress={() => removeFromWatchList(titleID, setInWatchList, setWatched)}>
              <Text style={styles.removeWatchListButtonText}>Remove From WatchList</Text>
            </Pressable>
          </View>
        );
      } else {
        return (
          <View style={styles.watchListButtonsContainer}>
            <Pressable style={styles.watchListButton}
                       onPress={() => setWatchStatus(titleID, setWatched, titleData, true)}>
              <Text style={styles.watchListButtonText}>Mark As Watched</Text>
            </Pressable>
            <Pressable style={styles.removeWatchListButton}
                       onPress={() => removeFromWatchList(titleID, setInWatchList, setWatched)}>
              <Text style={styles.removeWatchListButtonText}>Remove From WatchList</Text>
            </Pressable>
          </View>
        );
      }
    }

    return (
      <View>
        <Pressable style={styles.watchListButton}
                   onPress={() => addToWatchList(titleID, titleData, setInWatchList)}
        >
          <Text style={styles.watchListButtonText}>Add to Watch List</Text>
        </Pressable>
      </View>
    );
  };

  const displayLoading = () => {
    return (
      <View style={styles.page}>
        <ActivityIndicator animating={loading} size="large" color="#6c6f75" style={{ margin: 50 }} />
      </View>
    );
  };

  const TrailerButton = () => {
    return (
        <Pressable style={styles.trailersButton}
          title="open Youtube" onPress={() => {
          Linking.openURL(`https://www.youtube.com/results?search_query=${titleID}+trailers`)
        }} color="darkred">
          <Text style={styles.trailersButtonText}>Watch Trailers</Text>
          <Image
            style={{ width: 18, height: 18, alignSelf: "center", tintColor: "white" }}
            source={require("../assets/play_icon.png")}
          />
        </Pressable>
    )
  }

  const Rating = () => {
    if (!titleData.Ratings) {
      return;
    }

    const ratingSource = titleData?.Ratings[0].Source;
    const rating = titleData?.Ratings[0].Value.split("/");

    return (
      <StarRatingDisplay
        rating={Number(rating[0]) / 2}
        maxStars={Number(rating[1]) / 2}
        style={{ alignSelf: "center" }}
      />
    );
  };

  const ShareButton = () => {

    return (
      <Pressable style={styles.trailersButton}
        onPress={async () => {
        await Share.share({
          message: `Check out this ${titleData.Type} called '${titleData.Title}' I found on WatchListApp! https://www.imdb.com/title/${titleID}/`,
        })
      }}>
        <Text style={styles.trailersButtonText}>Share With Friends</Text>
        <Image
          style={{ width: 18, height: 18, alignSelf: "center", tintColor: "white" }}
          source={require("../assets/share_icon.png")}
        />
      </Pressable>
    )
  }

  const displayData = () => {
    return (
      <ScrollView style={styles.page}>
        <Text style={styles.title}>{titleData.Title?.toUpperCase()}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: titleData.Poster }} />
        </View>
        <Text style={styles.yearAndGenre}>{titleData.Released} – {titleData.Genre}</Text>
        <Rating />
        <WatchListButtons />
        <Text style={styles.plot}>{titleData.Plot}</Text>
        <View style={{flexDirection: "row", alignSelf: "center"}}>
          <TrailerButton />
          <ShareButton />
        </View>
      </ScrollView>
    );
  };

  return loading ? displayLoading() : displayData();
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: "5%",
    backgroundColor: "#2b2d30",
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
    fontFamily: "BebasNeue-Regular",
    margin: 5,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    textAlign: "center",
  },
  imageContainer: {
    height: 280,
    width: "70%",
    margin: "auto",
    alignSelf: "center",
  },
  image: {
    resizeMode: "cover",
    height: 280,
    borderRadius: 15,
  },
  yearAndGenre: {
    alignSelf: "center",
    width: "90%",
    textAlign: "center",
    color: "white",
    marginVertical: 10,
  },
  plot: {
    alignSelf: "center",
    width: "90%",
    textAlign: "center",
    color: "white",
  },
  watchListButtonsContainer: {
    marginVertical: 5,
  },
  watchListButton: {
    backgroundColor: "#B11515",
    alignSelf: "center",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
  },
  watchListButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  removeWatchListButton: {
    backgroundColor: "#1f2023",
    alignSelf: "center",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
  },
  removeWatchListButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  trailersButton: {
    flexDirection: "row",
    backgroundColor: "#1f2023",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    margin: 5,
  },
  trailersButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 5
  }
});
