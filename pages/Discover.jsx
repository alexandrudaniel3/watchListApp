import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import TitlePreview from "../components/TitlePreview";

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  const onChangeSearch = query => {
    setSearchQuery(query);
    console.log(query);
  };

  return (
    <View style={styles.searchBar}>
      <Searchbar
        style={styles.searchBarInput}
        placeholder="Search Here"
        onChangeText={onChangeSearch}
        value={searchQuery}
        placeholderTextColor="black"
        inputStyle={{ color: "black" }}
        // icon={require('../assets/search-icon-64px.png')}
        // iconColor={"black"}
        // clearIcon={require('../assets/clear-icon-64px.png')}
      />
    </View>
  );
};

export default function Discover({navigation}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTitles, setSearchedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTitles = async () => {
    if (searchQuery.trim() === "") {
      setSearchedTitles([]);
      return;
    }

    setLoading(true);
    const results = await fetch("https://www.omdbapi.com/?apikey=" + process.env["REACT_APP_API_KEY"] + "&s=" + searchQuery.trim())
      .then(response => response.json())
      .then(data => data.Search);
    setLoading(false);

    if (!results) {
      setSearchedTitles([]);
      return;
    }

    setSearchedTitles(results);
  };

  useEffect(() => {
    searchTitles();
  }, [searchQuery]);


  return (
    <View style={{ flex: 1 }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView keyboardShouldPersistTaps="handled">
        {searchedTitles.length !== 0 ?
          searchedTitles.map((title, index) => (
            <TitlePreview data={title} key={index} navigation={navigation}/>
          )) : searchQuery.trim() === "" ? <Text>Search now :)</Text> : loading ? null : <Text>No titles found.</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
  },
  searchBarInput: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "black",
  },
});
