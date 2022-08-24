import React, { useEffect, useState } from 'react';

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
  TextInput
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

const AssetAddScreen = ({navigation}) => {
   
    useEffect(()=>{
      navigation.setOptions({ title: 'Aggiungi un nuov elemento' })
    },[]);

    return(
        <View style={{flex: 1 }}>
          <View>
            <Text>Nome articolo</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Type here to translate!"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
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
export default AssetAddScreen;