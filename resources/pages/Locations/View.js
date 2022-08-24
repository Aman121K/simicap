import React, { Component, useEffect, useState } from 'react';

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
  TouchableOpacity
} from 'react-native';

import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from "axios";

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE_URL } from '../config';

const LocationViewScreen = ({route, navigation}) => {
  let itemId = route.params.params.itemId;
  let itemTitle = route.params.params.itemTitle;
  
  useEffect(()=>{
      navigation.setOptions({ title: itemTitle })
  },[]);

    return(
      <View style={{ padding: 20, backgroundColor: '#FFF', borderRadius: 10, marginTop: 10, marginLeft: 15, marginRight: 15 }}>
          <View style={{ flexDirection: 'row'}}>
              <Ionicons name="ios-cube-outline" size={23} color='#333' />
              <Text style={[styles.regularFont, { color: '#333', fontSize: 16, marginLeft: 5 }]}>Nome posizione</Text>
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
    fontFamily: {
      fontFamily : 'Poppins-Regular'
    }
});
export default LocationViewScreen;