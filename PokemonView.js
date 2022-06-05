import React from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";

export default function PokemonView({
  pokemon,
  setFavorites,
  favorites,
  setShowDetails,
}) {
  const clickHandler = () => {
    addToFavorites();
    console.log(favorites);
  };

  const pokemonNotFound = () => {
    let temp = true;
    favorites.map((obj) => {
      if (obj.pokemon.id === pokemon.id) {
        Alert.alert(
          `Can't Add Pokemon`,
          `${pokemon.name} already in favorites list `,
          [{ text: "ok", onPress: () => console.log("alert closed") }]
        );
        temp = false;
      }
    });
    return temp;
  };

  const addToFavorites = () => {
    console.log(pokemonNotFound());
    if (pokemonNotFound()) {
      setFavorites([...favorites, { pokemon }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.xButton}>
        <Button
          title="X"
          onPress={() => setShowDetails(false)}
          style={styles.button}
        />
      </View>
      <Text style={styles.boldText}>Name: {pokemon.name}</Text>
      <Text style={styles.boldText}>Type: {pokemon.type}</Text>
      <Image
        source={{
          uri: `${pokemon.img}`,
          width: 160,
          height: 160,
        }}
      />
      <Button title="Add to  ♥" onPress={() => clickHandler()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    margin: 10,
    paddingTop: 0,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 8,
    margin: 150,
  },
  xButton: {
    position: "absolute",
    top: 0,
    left:3,
  },
});
