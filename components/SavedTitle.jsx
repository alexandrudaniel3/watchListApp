import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SavedTitle({ data, id, navigation }) {
  // console.log(data);
  return (
    <Pressable
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={styles.titleContainer}
      onPress={() => navigation.navigate("Title", {
        titleID: id,
      })}>
      <View style={{ flex: 1 }}>
        {data.imageSource !== 'N/A' ? <Image source={{ uri: data.imageSource }} style={{ height: 70, width: 70 }} /> : <Text>No image</Text>}
      </View>
      <View style={{ flex: 3}}>
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 90,
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
    alignContent: 'center'
  },
  titleText: {
    color: "white",
    justifyContent:"center",
    fontSize: 20,
    fontWeight: "bold",
  },
})
