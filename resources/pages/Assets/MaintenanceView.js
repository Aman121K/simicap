import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
} from 'react-native';

import {
    Title,
} from 'react-native-paper';

import axios from "axios";

import SearchBar from "react-native-dynamic-search-bar";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../config';

const ViewAssetMaintenance = ({route, navigation}) => {

    let itemId = route.params.params.itemId;

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [masterItemData, setmasterItemData] = useState([]);
    const [filterItemData, setfilterItemData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect( () => {
        navigation.setOptions({ title: "Manutenzione" }),
        (
        async() => { 
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            if( userToken != null ){
                let formData = {
                    user_id : userToken,
                    item_id : itemId,
                }
                axios({
                    url: `${API_BASE_URL}/itemView`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(res => {

                if(res.data.status == 1){
                    let item_list = JSON.stringify(res.data.maintenance_history);
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
    },[]);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterItemData.filter(function (item) {
            // Applying filter for the inserted text in search bar
                const itemData = item.maintenance_type == 2
                    ? 'REVISION'
                    : 'MAINTENANCE';
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

    const ItemView = ({ item }) => {
                
        return (
            <View style={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between'}}>
                    <View style={{ flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={{ fontSize: 12 }}><Title style={{ fontSize: 12, color: 'black', lineHeight: 20 }}>Tipo di scadenza: </Title>{item.maintenance_type == 2 ? 'Revisions' : 'Maintenance' }</Text>
                            <Text style={{ fontSize: 12 }}><Title style={{ fontSize: 12, color: 'black', lineHeight: 20}}>Data: </Title>{item.maintenance_date}</Text>
                            <Text style={{ fontSize: 12 }}><Title style={{ fontSize: 12, color: 'black', lineHeight: 20}}>Note: </Title>{item.notes}</Text>
                        </View>
                    </View>
                </View>
            </View>          
        );
    };

    return(
        <View style={[ styles.container ]}>
            <View style={{ marginTop: 20 }}>
                <SearchBar
                    placeholder="Cerca qui..."
                    style={[styles.textInputStyle, styles.regularFont ]}
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
    textStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    regularFont: {
      fontFamily : 'Montserrat-Regular'
    },
    primaryColor: {
      color: '#04487b'
    }
});

export default ViewAssetMaintenance;