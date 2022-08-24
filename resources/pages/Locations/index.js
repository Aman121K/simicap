import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationListingScreen from './Listing';
import LocationAddScreen from './Add';
import LocationEditScreen from './Edit';
import LocationViewScreen from './View';

const Stack = createNativeStackNavigator();

const LocationScreen = ({navigation}) => {
    return(
          <Stack.Navigator initialRouteName="LocationListing">
              <Stack.Screen name="LocationListing" component={LocationListingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AddLocation" component={LocationAddScreen} />
              <Stack.Screen name="EditLocation" component={LocationEditScreen} />
              <Stack.Screen name="ViewLocation" component={LocationViewScreen} />
          </Stack.Navigator>
    );
}

export default LocationScreen;