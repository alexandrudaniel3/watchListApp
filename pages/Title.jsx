import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const getTitleData = async (titleID, setTitleData, setLoading) => {

  try {
    const response = await fetch("https://www.omdbapi.com/?apikey=" + process.env["REACT_APP_API_KEY"] + "&i=" + titleID);
    const data = await response.json();
    setTitleData(data);
    console.log(data);
    setLoading(false);
  } catch (e) {
    console.log(e);
  }
}

export default function Title ({route}) {

  const { titleID } = route.params;
  const [titleData, setTitleData] = useState({});
  const [watchData, setWatchData] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    getTitleData(titleID, setTitleData, setLoading);
    console.log(titleData);
  }, []);



  return (
    <View style={styles.page}>
      {loading ? <Text>Loading...</Text> : null}
      <Text style={styles.title}>{titleData.Title}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: titleData.Poster}}/>
      </View>
        <Text style={styles.yearAndGenre}>{titleData.Released}  {titleData.Genre}</Text>

      <Text style={styles.plot}>{titleData.Plot}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: "5%",
  },
  title: {
    alignSelf:"center",
    fontWeight: "bold",
    fontSize: 40,
  },
  imageContainer: {
    height: 280,
    width: "70%",
    margin: "auto",
    alignSelf: "center"
  },
  image: {
    resizeMode: "cover",
    height: 280,
  },
  yearAndGenre: {
    alignSelf: "center",
    width: "90%",
    textAlign: "center"
  },
  plot: {
    alignSelf: "center",
    width: "90%",
    textAlign: "center"
  },
})
