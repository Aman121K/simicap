import React from 'react';
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

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/Login';
 
const Stack = createNativeStackNavigator();

const RootNavigationBar = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default RootNavigationBar;