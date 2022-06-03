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
} from "react-native";
import { ModalPicker } from "../components/ModalPicker";
export default function Favorites({ navigation }) {
  const [fav, setFav] = useState([]);
  const [filter, setFilter] = useState([]);
  const [choose, setChoose] = useState("Select type");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setFav(navigation.getParam("favorites"));

    filterHandler();
  }, [fav, choose]);

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
