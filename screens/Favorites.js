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
  }, [fav, choose]);

  const getJsonData = () => {
    fetch(`https://pokeapi.co/api/v2/type/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(`JSON ---> ${res.results[0].name}`);
        setTypes(res.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterHandler = () => {
    //   const sorti = await NativeAsyncLocalStorage
    switch (choose) {
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

  const sortSwitch = () => {
    if (!isSorted) {
      // setSort(fav);
      setSort([...fav]);
      setFilter(sortHandler());
    } else {
      setFilter(fav);
    }
  };

  const changeSortStatus = () => {
    sortSwitch();
    setIsSorted(!isSorted);
    console.log(`isSorted change to: ${isSorted}`);
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
  const deleteHandler = () => {
    setFav(fav.filter((item) => item.pokemon.id !== fav.pokemon.id));
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const setData = (option) => {
    setChoose(option);
  };
  console.log(fav);

  return (
    <View>
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
          />
        </Modal>
      </SafeAreaView>
      <Switch
        trackColor={{ false: "grey", true: "blue" }}
        thumbColor={isSorted ? "#f4f3f4" : "#f4f3f4"}
        onValueChange={changeSortStatus}
        value={isSorted}
      />
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
  select: {
    padding: 20,
    justifyContent: "center",
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
  touchableOpacity: {
    backgroundColor: "azure",
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
});
