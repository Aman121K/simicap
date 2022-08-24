import React, { Component, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AssetScreen from '../pages/Assets';
import LocationScreen from '../pages/Locations';
import ProfileScreen from '../pages/Profile';
import DocumentScreen from '../pages/Documents';
import SettingScreen from '../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigationBar = ({navigation}) => {
    return (
      <Tab.Navigator
        initialRouteName="Tutti gli oggetti"
        screenOptions={{
            tabBarActiveTintColor: '#e91e63',
        }}
        >
        <Tab.Screen
            name="Tutti gli oggetti"
            component={AssetScreen}
            options={{
                tabBarLabel: 'Tutti gli oggetti',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="md-location-outline" size={25} color={color} />
                ),
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Tutte le posizioni"
            component={LocationScreen}
            options={{
                tabBarLabel: 'Tutte le posizioni',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-cube-outline" size={25} color={color} />
                ),
            }}
        />
        
        <Tab.Screen
            name="Documenti"
            component={DocumentScreen}
            options={{
                tabBarLabel: 'Documenti',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="document-text-outline" size={25} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Impostazioni"
            component={SettingScreen}
            options={{
                tabBarLabel: 'Impostazioni',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-settings-outline" size={25} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
    );
}

export default TabNavigationBar;