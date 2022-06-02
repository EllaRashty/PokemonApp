import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";

export default function PokemonView({ pokemon, setFavorites, favorites }) {
  const clickHandler = () => {
    setFavorites([...favorites, { pokemon }]);
    console.log(favorites);
  };

  const containPokemon = () => {
    if (pokemon === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>{pokemon.name}</Text>
      <Text style={styles.boldText}>Type: {pokemon.type}</Text>
      <Image
        source={{
          uri: `${pokemon.img}`,
          width: 160,
          height: 160,
        }}
      />
      <Button title="Add to " onPress={clickHandler} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
