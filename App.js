import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  Image,
} from "react-native";
import PokemonView from "./PokemonView";

export default function App() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState({});

  const clickHandler = () => {
    getJsonData();
  };
  const getJsonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setPokemon({
          name: res.name.toUpperCase(),
          weight: res.weight,
          img: res.sprites.other.home.front_default,
          type: res.types[0].type.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Search Pokemon:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="bulbasaur "
        onChangeText={(value) => setName(value)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={clickHandler} />
      </View>
      <PokemonView pokemon={pokemon}></PokemonView>
      {/* <Image source={myBackground}></Image> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "pink",
    padding: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  body: {
    backgroundColor: "yellow",
    padding: 20,
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
});
