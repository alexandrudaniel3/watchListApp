import { Image, View, Text, Pressable } from "react-native";

export default function TitlePreview({ data, navigation }) {

  console.log(data);
  return (
    <Pressable
      delayPressIn={10} delayPressOut={10} delayLongPress={10}
      style={{ height: 100, flexDirection: "row" }}
      onPress={() => navigation.navigate("Title", {
        titleID: data.imdbID,
      })}>
      <View style={{ flex: 1 }}>
        {data.Poster ? <Image source={{ uri: data.Poster }} style={{ height: 100 }} /> : <Text>No image</Text>}
      </View>
      <View style={{ flex: 3 }}>
        <Text>{data.Title}, {data.Year}</Text>
        <Text>{data.Type}</Text>

      </View>
    </Pressable>
  );
}
