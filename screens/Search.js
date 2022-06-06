import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import PokemonView from "../components/PokemonView";

export default function Search({ navigation }) {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const clickHandler = () => {
    if (name != "") {
      getJsonData();
    }
  };

  const pressHandler = () => {
    navigation.navigate("FavoritesPage", { favorites: favorites });
  };

  const getJsonData = () => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${name
        .toLocaleLowerCase()
        .replace(/\s/g, "")}/`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setShowDetails(true);
        setPokemon({
          name: res.name.toUpperCase(),
          weight: res.weight,
          img: res.sprites.other.home.front_default,
          type: res.types[0].type.name,
          height: res.height,
          id: res.id,
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(`Not Found`, ` Can't find pokemon `, [
          { text: "ok", onPress: () => console.log("alert closed") },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Search Pokemon:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Bulbasaur "
        onChangeText={(value) => setName(value)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={clickHandler} />
      </View>
      {showDetails ? (
        <PokemonView
          pokemon={pokemon}
          favorites={favorites}
          setFavorites={setFavorites}
          setShowDetails={setShowDetails}
        ></PokemonView>
      ) : null}
      <StatusBar style="auto" />
      <View style={styles.bottomContainer}>
        <Button title="⭐️  Go to Favorites  ⭐️" onPress={pressHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 50,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
  },
});
