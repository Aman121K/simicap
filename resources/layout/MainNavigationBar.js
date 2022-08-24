import React, { useContext } from 'react';
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

import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AssetScreen from '../pages/Assets/Listing';
import LocationScreen from '../pages/Locations/Listing';
import ProfileScreen from '../pages/Profile';
import DocumentScreen from '../pages/Documents/Listing';
import SettingScreen from '../pages/Settings';
import DrawerContent from './Sidebar';
 
const Drawer = createDrawerNavigator();

const MainNavigationBar = ({navigation}) => {
    return (
        <Drawer.Navigator 
            drawerContent={ (props) => <DrawerContent {...props} /> }
            screenOptions={{
                drawerActiveBackgroundColor : '#04487b',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor : '#FFF',
                drawerPosition: 'left',
                drawerLabelStyle : { 
                    marginLeft: -25,
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 15
                },
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#04487b',
                },
                headerTitleStyle:{
                    fontFamily: 'Montserrat-Regular',
                },
                headerTitleAlign: 'center',
            }}
            >
            <Drawer.Screen 
                name="Tutti gli oggetti" 
                component={AssetScreen} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="ios-cube-outline" size={25} color={color} />
                    )
                }} 
            />
            <Drawer.Screen 
                name="Tutte le posizioni"
                component={LocationScreen} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="md-location-outline" size={25} color={color} />
                    )
                }} 
            />
            <Drawer.Screen 
                name="Profilo"
                component={ProfileScreen} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="ios-person-outline" size={25} color={color} />
                    )
                }} 
            />
            <Drawer.Screen 
                name="Documenti" 
                component={DocumentScreen} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="document-text-outline" size={25} color={color} />
                    )
                }} 
            />
            <Drawer.Screen 
                name="Impostazioni" 
                component={SettingScreen} 
                options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="ios-settings-outline" size={25} color={color} />
                    )
                }} 
            />

        </Drawer.Navigator>
    );
}

export default MainNavigationBar;