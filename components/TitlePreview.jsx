import { Image, View, Text, Pressable, StyleSheet } from "react-native";

export default function TitlePreview({ data, navigation }) {

  return (
    <Pressable
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles.previewContainer}
      onPress={() => navigation.navigate("Title", {
        titleID: data.imdbID,
      })}>
      <View style={{ flex: 1 }}>
        {data.Poster ? <Image source={{ uri: data.Poster }} style={{ height: 80, width: 70 }} /> : <Text>No image</Text>}
      </View>
      <View style={{ flex: 3}}>
        <Text style={styles.previewText}>{data.Title}, {data.Year}</Text>
        <Text style={styles.previewText}>{data.Type}</Text>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    height: 100,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#6c6f75",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#111213FF",
    shadowOffset: {width: 5, height:5},
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  previewText: {
    color: "white",
  },
})
