import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SavedTitle({ data, id, navigation, displayMode }) {

  return (
    <Pressable
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles['titleContainer' + displayMode]}
      onPress={() => navigation.navigate("Title", {
        titleID: id,
      })}>
      <View style={{ flex: 1 }}>
        {data.imageSource !== "N/A" ? <Image source={{ uri: data.imageSource }} style={styles['titlePoster' + displayMode]} /> :
          <Text>No image</Text>}
      </View>
      <View style={styles['titleTextContainer' + displayMode]}>
        <Text style={styles['titleText' + displayMode]}>{data.title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleContainergrid: {
    width: 110,
    marginHorizontal: 10,
    backgroundColor: "#6c6f75",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#111213FF",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    alignItems: "center",
    alignSelf: "center",
  },
  titleContainerlist: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#6c6f75",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#111213FF",
    shadowOffset: {width: 5, height:5},
    shadowOpacity: 0.75,
    shadowRadius: 3,
    alignItems: 'center'
  },
  titleTextContainergrid: {
    display: "none",
  },
  titleTextContainerlist: {
    flex: 3,
  },
  titleTextlist: {
    color: "white",
    fontSize: 20,
    fontFamily: "Lato-Bold",
  },
  titlePostergrid: {
    height: 120,
    width: 90,
    borderRadius: 5,
  },
  titlePosterlist: {
    height: 90,
    width: 80,
    borderRadius: 5,
  },
});
