import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Title,
  Paragraph,
} from 'react-native-paper';

import axios from "axios";

import SearchBar from "react-native-dynamic-search-bar";

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../config';

const AssetListingScreen = ({ navigation }) => {

  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const [masterItemData, setmasterItemData] = React.useState([]);
  const [filterItemData, setfilterItemData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAssetsList(1)
  }, []);
  const fetchAssetsList = async (pagenumber) => {
    let userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken);
    if (userToken != null) {
      let formData = {
        user_id: userToken,
        search_key: '',
      }
      axios({
        url: `${API_BASE_URL}/itemlist?page=${pagenumber}`,
        method: 'POST',
        data: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        if (res.data.status == 1) {
          let item_list = JSON.stringify(res.data.item_list);
          console.log("Vikas All listing data..", item_list);
          let itemjson = JSON.parse(item_list);
          setmasterItemData(itemjson);
          setfilterItemData([...filterItemData, ...itemjson]);
        } else {
          Alert.alert(
            "Warning",
            "Somthing went wrong, Try Again",
            [
              { text: "OK" }
            ]
          );
        }
      }).catch(e => {
        Alert.alert(
          "Warning",
          "Somthing went wrong, Try Again",
          [
            { text: "OK" }
          ]
        );
      });
    }
  }


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterItemData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.item_name
          ? item.item_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterItemData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setfilterItemData(masterItemData);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {

    return (
      <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {item.item_image_url != '' ? <Image source={{ uri: item.item_image_url }} style={{ width: 50, height: 80, borderRadius: 10, marginRight: 20 }} /> : <Image source={require('../../assets/images/empty.png')} style={{ width: 50, height: 80, borderRadius: 10, marginRight: 20 }} />}
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Title style={[styles.fontMedium, { fontSize: 15, marginBottom: 0, lineHeight: 20, color: 'black' }]}>{item.item_name}</Title>
              <Paragraph style={[styles.fontRegular, { fontSize: 12, lineHeight: 20, marginBottom: 0 }]}>{item.location_name}</Paragraph>
              <Text style={{ fontSize: 12 }}><Title style={{ fontSize: 12, color: 'black' }}>Scandenza: </Title>{item.expiry_date_time}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 8, borderTopColor: '#EEE', borderTopWidth: 1, paddingTop: 8 }}>
          <TouchableOpacity onPress={() =>
            navigation.navigate('ViewAsset', {
              screen: 'AssetViewScreen',
              params: {
                itemId: item.item_id,
                itemTitle: item.item_name
              },
            })
          } style={{ flexDirection: 'row' }}>
            <Ionicons name="eye-outline" color='#04487b' size={16}></Ionicons><Text style={{ marginLeft: 4, color: '#04487b', fontSize: 13 }}>Visualizzazione</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            navigation.navigate('EditAsset', {
              screen: 'AssetEditScreen',
              params: {
                itemId: item.item_id,
                itemTitle: item.item_name
              },
            })
          } style={{ flexDirection: 'row', marginLeft: 13, marginRight: 13 }}>
            <Ionicons name="ios-create-outline" color='#ff8c00' size={16}></Ionicons><Text style={{ marginLeft: 0, color: '#ff8c00', fontSize: 13 }}>Modifica</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            navigation.navigate('EditAsset', {
              screen: 'AssetEditScreen',
              params: {
                itemId: item.item_id,
                itemTitle: item.item_name
              },
            })
          } style={{ flexDirection: 'row' }}>
            <Ionicons name="ios-trash-outline" color='#B31817' size={16}></Ionicons><Text style={{ marginLeft: 0, color: '#B31817', fontSize: 13 }}>Cancella</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 10,
          width: '100%',
          backgroundColor: 'transparent',
        }}
      />
    );
  };


  if (isLoading == true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const callMoreApi = () => {
    console.log("Calling more Data..", pageNumber + 1);

    fetchAssetsList(pageNumber + 1);

    setPageNumber(pageNumber + 1)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#04487b' hidden={false} />
      <View style={{ flex: 1, marginTop: 20 }}>

        <TextInput

          placeholder="Cerca qui..."
          style={[styles.textInputStyle, styles.fontRegular]}
          underlineColorAndroid="transparent"
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
        >
        </TextInput>
        {/* <SearchBar
          placeholder="Cerca qui..."
          style={[styles.textInputStyle, styles.fontRegular]}
          underlineColorAndroid="transparent"
          value={search}
          //onPress={() => alert("onPress")}
          onChangeText={(text) => searchFilterFunction(text)}
        /> */}
        <FlatList
          data={filterItemData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          onEndReached={callMoreApi}
          onEndReachedThreshold={0.1}
          style={{ marginTop: 20 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ position: 'absolute', bottom: 80, right: 10, alignSelf: 'flex-end' }}>
            <TouchableOpacity><Ionicons name="ios-qr-code-outline" color='#B31817' size={30}></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 20, alignSelf: 'flex-end' }}>
            <TouchableOpacity><Ionicons name="add-circle-sharp" color='#B31817' size={45}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemStyle: {
    padding: 10,
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // marginLeft:'5%'
  },
  fontRegular: {
    fontFamily: 'Montserrat-Regular',
    // marginLeft:'5%'
  },
  fontMedium: {
    fontFamily: 'Montserrat-Medium'
  },
  primaryColor: {
    color: '#04487b'
  }

});
export default AssetListingScreen;