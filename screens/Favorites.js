import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
export default function Favorites({ navigation }) {
  const [fav, setFav] = useState([]);
  const [filter, setFilter] = useState([]);
  const [input, setInput] = useState("all");

  useEffect(() => {
    setFav(navigation.getParam("favorites"));
    filterHandler();
  }, [fav,input]);

  const filterHandler = () => {
    //   const sorti = await NativeAsyncLocalStorage
    switch (input) {
      case "normal":
        setFilter(fav.filter((item) => item.pokemon.type === "normal"));
        break;
      case "grass":
        setFilter(fav.filter((item) => item.pokemon.type === "grass"));
        break;
      case "electric":
        setFilter(fav.filter((item) => item.pokemon.type === "electric"));
        break;
      default:
        setFilter(fav);
        break;
    }
  };

  const pressHandler = () => {
    navigation.goBack();
  };
  const deleteHandler = () => {
    setFav(fav.filter((item) => item.pokemon.id !== fav.pokemon.id));
  };
  console.log(fav);

  return (
    <View>
      <ScrollView>
        {filter.map((p) => (
          <View style={styles.item} key={p.pokemon.id}>
            <Text style={styles.boldText}>{p.pokemon.name}</Text>
            <Text>type: {p.pokemon.type}</Text>
            <Text>weight: {p.pokemon.weight}</Text>
            <Text>height: {p.pokemon.height}</Text>
            <Image
              source={{
                uri: `${p.pokemon.img}`,
                width: 120,
                height: 120,
              }}
            />
            <Button title="delete" onPress={deleteHandler} />
          </View>
        ))}
      </ScrollView>
      <Button title="Back to search" onPress={pressHandler} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  item: {
    marginTop: 24,
    padding: 10,
    backgroundColor: "#ffff",
  },
  boldText: {
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
