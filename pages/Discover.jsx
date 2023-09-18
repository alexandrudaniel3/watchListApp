import { View, StyleSheet, Text, ScrollView, Pressable, Image, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import TitlePreview from "../components/TitlePreview";

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");
  const onChangeSearch = query => {
    setInput(query);
  };

  const onSearchButtonPress = () => {
    setSearchQuery(input);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.searchBarInput}
                 placeholder="Search Here"
                 onChangeText={onChangeSearch}
                 value={input}
                 placeholderTextColor="#2b2d30"
      />
      <Pressable
        onPress={onSearchButtonPress}>
        <Image
          style={styles.searchBarButton}
          source={require("../assets/search_icon.png")}
        />
      </Pressable>
    </View>
  );
};

export default function Discover({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTitles, setSearchedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTitles = async () => {
    if (searchQuery.trim() === "") {
      setSearchedTitles([]);
      return;
    }

    setLoading(true);
    const results = await fetch("https://www.omdbapi.com/?apikey=7f2f41c3&s=" + searchQuery.trim())
      .then(response => response.json())
      .then(data => data.Search);

    const filteredResults = results?.filter(element => element.Type !== "game");
    setLoading(false);

    if (!filteredResults) {
      setSearchedTitles([]);
      return;
    }

    setSearchedTitles(filteredResults);
  };

  useEffect(() => {
    searchTitles();
  }, [searchQuery]);

  const SearchNow = () => {
    return (
      <View style={{ flex: 1, justifySelf: "center", alignSelf: "center" }}>
        <Image
          style={{ width: 128, height: 119.5, alignSelf: "center", marginTop: 20, tintColor: "#6c6f75" }}
          source={require("../assets/television_icon.png")}
        />
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#6c6f75", fontSize: 20, margin: 20 }}
        >Enter a keyword to search for TV series and Movies.</Text>
      </View>
    );
  };

  const NoTitlesFound = () => {
    return (
      <View>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#6c6f75", fontSize: 20, margin: 20 }}
        >
          No matching TV series or Movies with keyword "{searchQuery?.trim()}".
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <ScrollView keyboardShouldPersistTaps="handled">
        {searchedTitles.length !== 0 ?
          searchedTitles.map((title, index) => (
            <TitlePreview data={title} key={index} navigation={navigation} />
          )) : searchQuery.trim() === "" ? <SearchNow /> : loading ? null : <NoTitlesFound />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#2b2d30",
  },
  searchBar: {
    height: 60,
    marginVertical: 20,
    flexDirection: "row",
  },
  searchBarInput: {
    flex: 1,
    margin: 5,
    backgroundColor: "#6c6f75",
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchBarButton: {
    width: 40,
    height: 40,
    margin: 10,
    marginLeft: 0,
    tintColor: "#6c6f75",
  },
});
