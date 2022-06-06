import React, { useState } from "react";
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
  const [rotateDeg, setRotateDeg] = useState(0);

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

  const rotateImg = (deg) => {
    setRotateDeg(rotateDeg + deg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.xButton}>
        <Button
          title="X"
          color="tomato"
          onPress={() => setShowDetails(false)}
          style={styles.button}
        />
      </View>
      <Text style={styles.boldText}>Name: {pokemon.name}</Text>
      <Text style={styles.boldText}>Type: {pokemon.type}</Text>
      <Image
        style={{ transform: [{ rotate: `${rotateDeg}deg` }] }}
        source={{
          uri: `${pokemon.img}`,
          width: 160,
          height: 160,
        }}
      />
      <View style={styles.rotateButton}>
        <Button color="#fbfbfb" title="⬅️" onPress={() => rotateImg(10)} />
        <Text style={styles.buttonSpace}>Rotate</Text>
        <Button
          color="#fbfbfb"
          borderRadius={20}
          title="➡️"
          onPress={() => rotateImg(-10)}
        />
      </View>
      <Button color="green" title="Add to  ♥" onPress={() => clickHandler()} />
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
    marginTop:20,
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
    right: 3,
  },
  rotateButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonSpace: {
    fontWeight: "bold",
    margin: 10,
    padding: 20,
  },
});
