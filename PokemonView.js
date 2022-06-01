import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";

export default function PokemonView({ pokemon }) {
  return (
    <View style={styles.container}>
      {/* {pokemon.map((p) => { */}
      {/* return ( */}
      <View style={styles.container}>
        <Text style={styles.boldText}>Name: {pokemon.name}</Text>
        <Text style={styles.boldText}>Weight: {pokemon.weight}</Text>
        <Image
          source={{
            uri: `${pokemon.img}`,
            width: 160,
            height: 160,
          }}
        />
        <Text style={styles.boldText}>Type: {pokemon.type}</Text>
      </View>
      {/* ); */}
      {/* })} */}
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
