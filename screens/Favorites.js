import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import { ModalPicker } from "../components/ModalPicker";
export default function Favorites({ navigation }) {
  const [fav, setFav] = useState([]);
  const [filter, setFilter] = useState([]);
  const [choose, setChoose] = useState("Select type");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [sort, setSort] = useState([]);
  const [isSorted, setIsSorted] = useState("false");

  const [types, setTypes] = useState({});

  useEffect(() => {
    setFav(navigation.getParam("favorites"));
    getJsonData();
    filterHandler();
    setSort([...fav]);
  }, [fav, choose]);

  const getJsonData = () => {
    fetch(`https://pokeapi.co/api/v2/type/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setTypes(res.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setChoose("Select type");
    setFilter(fav);
  };

  const filterHandler = () => {
    //   const sorti = await NativeAsyncLocalStorage
    if (choose !== "Select type") {
      setFilter(fav.filter((item) => item.pokemon.type === choose));
    } else {
      clear();
    }
  };

  const sortSwitch = () => {
    if (!isSorted) {
      setFilter(sortHandler());
    } else {
      setFilter(fav);
    }
  };

  const changeSortStatus = () => {
    sortSwitch();
    setIsSorted(!isSorted);
  };

  const sortHandler = () => {
    sort.sort(function (a, b) {
      if (a.pokemon.type < b.pokemon.type) return -1;
      if (a.pokemon.type > b.pokemon.type) return 1;
      return 0;
    });
    return sort;
  };

  const pressHandler = () => {
    navigation.goBack();
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setChoose(option);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.select}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => changeModalVisibility(true)}
        >
          <Text>{choose}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}
        >
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            setData={setData}
            types={types}
          />
        </Modal>
      </SafeAreaView>
      <View style={styles.switchContainer}>
        <Text>Sort:</Text>
        <Switch
          trackColor={{ false: "grey", true: "blue" }}
          thumbColor={isSorted ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={() => changeSortStatus()}
          value={isSorted}
          style={{ marginLeft: 180 }}
        />
        <Button title="Clear" onPress={clear} />
      </View>

      <ScrollView>
        {filter.map((p) => (
          <View style={styles.item} key={p.pokemon.id}>
            <Text style={styles.boldText}>{p.pokemon.name}</Text>
            <Text>Type: {p.pokemon.type}</Text>
            <Text>Weight: {p.pokemon.weight}</Text>
            <Text>Height: {p.pokemon.height}</Text>
            <Image
              source={{
                uri: `${p.pokemon.img}`,
                width: 120,
                height: 120,
              }}
            />
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
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  switchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  select: {
    padding: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  item: {
    margin: 10,
    marginTop: 5,
    padding: 10,
    paddingTop: 0,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacity: {
    backgroundColor: "azure",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
