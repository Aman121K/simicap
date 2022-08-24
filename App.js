/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useContext, useEffect } from 'react';
import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Dimensions,
   ActivityIndicator,
} from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

//import Ionicons from 'react-native-vector-icons/Ionicons';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Entypo from 'react-native-vector-icons/Entypo';
 
import RootNavigationBar from './resources/layout/RootNavigationBar';
import MainNavigationBar from './resources/layout/MainNavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext, AuthProvider } from './resources/context/AuthContext';
 
const App = () => {
  const initialLoginState = {
    isLoading : true,
    userData: {},
    userToken: null
  };

  const loginReducer = ( prevState, action ) => {
    switch( action.type ){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken : action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userData : action.userdata,
          userToken : action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userData : {},
          userToken : null,
          isLoading: false,
        };
        case 'REGISTER':
          return {
            ...prevState,
            userData : action.userdata,
            userToken : action.token,
            isLoading: false,
        };
    }
  };
  
  const[ loginState, dispatch ] = React.useReducer(loginReducer, initialLoginState);
  
  const authContext = React.useMemo(() => ({

    signIn: async(userToken, userData) => {
      if( userToken != '' && userData != ''){
        try{
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userData', userData);
        }catch(e){
          Alert.alert(
              "Warning",
              "Somthing went wrong, Try Again",
              [
                { text: "OK" }
              ]
          );
        }
      }
      dispatch({ type: 'LOGIN', userdata: userData, token: userToken });
    },

    signOut: async() => {
      try{
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
      }catch(e){
        Alert.alert(
          "Warning",
          "Somthing went wrong, Try Again",
          [
            { text: "OK" }
          ]
        );
      }
      dispatch({ type: 'LOGOUT' });
    }
  }), []);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
        userData = await AsyncStorage.getItem('userData');
      }catch(e){
        Alert.alert(
            "Warning",
            "Somthing went wrongdsf, Try Again",
            [
              { text: "OK" }
            ]
        );
      }
      dispatch({ type: 'REGISTER', token: userToken, userdata:userData });
    }, 1000);
  }, []);

  if(loginState.isLoading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return(
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            { loginState.userToken != null ? ( <MainNavigationBar/> ) : <RootNavigationBar/> }
        </NavigationContainer>
      </AuthContext.Provider>
    );    
}

export default App;