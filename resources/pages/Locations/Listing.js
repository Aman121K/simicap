import React, { useState, useEffect } from 'react';

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
} from 'react-native';

import {
  Title,
  Paragraph,
} from 'react-native-paper';

import SearchBar from "react-native-dynamic-search-bar";

import axios from "axios";

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../config';

const LocationListingScreen = ({ navigation }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [masterItemData, setmasterItemData] = useState([]);
  const [filterItemData, setfilterItemData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (
      async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        setUserToken(userToken);
        if (userToken != null) {
          axios({
            url: `${API_BASE_URL}/locationList/${userToken}`,
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          }).then(res => {
            if (res.data.status == 1) {
              let location_list = JSON.stringify(res.data.location_list);
              let locationjson = JSON.parse(location_list);
              setmasterItemData(locationjson);
              setfilterItemData(locationjson);
              //console.log(locationjson);
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
    )();

  });

  const ItemView = ({ item }) => {
    return (
      <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10 }} >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between' }}>
          <View style={{ alignSelf: 'flex-start', justifyContent: 'center' }}>
            <Ionicons name="md-location-outline" color='#B31817' size={45}></Ionicons>
          </View>
          <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
            <Title style={[styles.fontFamily, { fontSize: 14, width: 250, lineHeight: 20, marginBottom: 5 }]}>{item.location_name}</Title>
            <Paragraph style={[styles.fontFamily, { fontSize: 12 }]}>{item.description}</Paragraph>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 8, borderTopColor: '#EEE', borderTopWidth: 1, paddingTop: 8 }}>
          {/*<TouchableOpacity onPress={() =>
                      navigation.navigate('ViewLocation', {
                        screen: 'LocationViewScreen',
                        params: { 
                          itemId: item.location_id,
                          itemTitle: item.location_name 
                        },
                      })
                    } style={{ flexDirection: 'row' }}>
                  <Ionicons name="eye-outline" color='#04487b' size={16}></Ionicons>
                  <Text style={{ marginLeft: 4, color: '#04487b', fontSize: 13 }}>Visualizzazione</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                      navigation.navigate('EditLocation', {
                        screen: 'LocationEditScreen',
                        params: { 
                          itemId: item.location_id,
                          itemTitle: item.location_name 
                        },
                      })
                    } style={{ flexDirection: 'row', marginLeft: 13, marginRight: 13 }}>
                  <Ionicons name="ios-create-outline" color='#ff8c00' size={16}></Ionicons>
                  <Text style={{ marginLeft: 0, color: '#ff8c00', fontSize: 13 }}>Modifica</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                      navigation.navigate('EditLocation', {
                        screen: 'LocationEditScreen',
                        params: { 
                          itemId: item.location_id,
                          itemTitle: item.location_name  
                        },
                      })
                    } style={{ flexDirection: 'row' }}>
                    <Ionicons name="ios-trash-outline" color='#B31817' size={16}></Ionicons>
                    <Text style={{ marginLeft: 0, color: '#B31817', fontSize: 13 }}>Cancella</Text>
                </TouchableOpacity>*/}
        </View>
      </View>
    );
  };


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterItemData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.location_name
          ? item.location_name.toUpperCase()
          : ''.toUpperCase();
        //console.log(item);
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#04487b' hidden={false} />
      <View style={{ flex: 1, marginTop: 20 }}>
        <SearchBar
          placeholder="Cerca qui..."
          style={[styles.textInputStyle, styles.fontRegular]}
          underlineColorAndroid="transparent"
          value={search}
          //onPress={() => alert("onPress")}
          onChangeText={(text) => searchFilterFunction(text)}
        />
        <FlatList
          data={filterItemData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          style={{ marginTop: 20 }}
        />
        <View style={{ flex: 1 }}>
          <View style={{ position: 'absolute', bottom: 20, alignSelf: 'flex-end' }}>
            <TouchableOpacity>
              <Ionicons name="add-circle-sharp" color='#B31817' size={45}></Ionicons>
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
  },
  fontRegular: {
    fontFamily: 'Montserrat-Regular'
  }
});

export default LocationListingScreen;