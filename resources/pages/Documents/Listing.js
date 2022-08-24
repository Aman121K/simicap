import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Button,
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

const DocumentListingScreen =({navigation}) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [masterItemData, setmasterItemData] = useState([]);
    const [filterItemData, setfilterItemData] = useState([]);
    const [search, setSearch] = useState('');
    useEffect( () => { (
      async() => { 
          let userToken = await AsyncStorage.getItem('userToken');
          setUserToken(userToken);
          if( userToken != null ){
              axios({
                  url: `${API_BASE_URL}/viewDocument/${userToken}`,
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                  },
              }).then(res => {
                if(res.data.status == 1){
                    let item_list = JSON.stringify(res.data.document_list);
                    let itemjson = JSON.parse(item_list);
                    setmasterItemData(itemjson);
                    setfilterItemData(itemjson);
                }else{
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
      ) ();

    });

    const ItemView = ({ item }) => {
       
      return (
          <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between'}}>
                  <View style={{ alignSelf: 'flex-start', justifyContent: 'center'}}>
                    { item.documents !='' ? <Image source={{uri:item.documents}} style={{width: 70, height: 100, marginRight: 15 }}/> : <Image source={ require('../../assets/images/empty.png') } style={{width: 80, height: 100, marginRight: 15 }}/> }
                  </View>
                  <View style={{ alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Paragraph style={[styles.fontFamily, { fontSize: 12 }]}>Document Type: { item.document_type == 1 ? 'Transport Document' : 'Formulary' }</Paragraph>
                        <Paragraph style={[styles.fontFamily, { fontSize: 12 }]}>Document number: { item.shop_assistant }</Paragraph>
                        <Paragraph style={[styles.fontFamily, { fontSize: 12 }]}>DDT/Formulary number: { item.ddt_number }</Paragraph>
                        <Paragraph style={[styles.fontFamily, { fontSize: 12 }]}>Order number: { item.order_no }</Paragraph>
                    </View>
                  </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 8, borderTopColor: '#EEE', borderTopWidth: 1, paddingTop: 8 }}>
                  <TouchableOpacity onPress={() =>
                      navigation.navigate('ViewDocument', {
                        screen: 'DocumentViewScreen',
                        params: { 
                          itemId: item.id,
                        },
                      })
                    } style={{ flexDirection: 'row' }}>
                      <Ionicons name="eye-outline" color='#04487b' size={16}></Ionicons><Text style={{ marginLeft: 4, color: '#04487b', fontSize: 13 }}>Visualizzazione</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>
                      navigation.navigate('EditDocument', {
                        screen: 'DocumentEditScreen',
                        params: { 
                          itemId: item.id,
                        },
                      })
                    } style={{ flexDirection: 'row', marginLeft: 13, marginRight: 13 }}>
                      <Ionicons name="ios-create-outline" color='#ff8c00' size={16}></Ionicons><Text style={{ marginLeft: 0, color: '#ff8c00', fontSize: 13 }}>Modifica</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>
                      navigation.navigate('EditDocument', {
                        screen: 'DocumentEditScreen',
                        params: { 
                          itemId: item.id,
                        },
                      })
                    } style={{ flexDirection: 'row' }}>
                      <Ionicons name="ios-trash-outline" color='#B31817' size={16}></Ionicons><Text style={{ marginLeft: 0, color: '#B31817', fontSize: 13 }}>Cancella</Text>
                  </TouchableOpacity>
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
        const itemData = item.shop_assistant
          ? item.shop_assistant.toUpperCase()
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
    
    if(isLoading == true ){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#04487b' hidden={false} />
        <View style={{ flex: 1, marginTop: 20 }}>
            <SearchBar
                placeholder="Cerca qui..."
                style={[styles.textInputStyle, styles.fontRegular ]}
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
            <View style={{flex:1}}>
              <View style={{position:'absolute',bottom:20,alignSelf:'flex-end'}}>
                <TouchableOpacity><Ionicons name="add-circle-sharp" color='#B31817' size={45}></Ionicons>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    );
};


const styles = StyleSheet.create({
  container : {
      flex : 1,
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
    fontFamily : 'Montserrat-Regular'
  }
});

export default DocumentListingScreen;