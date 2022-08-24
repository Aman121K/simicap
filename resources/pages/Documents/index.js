import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DocumentListingScreen from './Listing';
import DocumentAddScreen from './Add';
import DocumentEditScreen from './Edit';
import DocumentViewScreen from './View';

const Stack = createNativeStackNavigator();

const DocumentScreen = ({navigation}) => {
    return(
          <Stack.Navigator initialRouteName="DocumentListing">
            <Stack.Screen name="DocumentListing" component={DocumentListingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AddDocument" component={DocumentAddScreen} options={{ headerShown: false }} />
              <Stack.Screen name="EditDocument" component={DocumentEditScreen} />
              <Stack.Screen name="ViewDocument" component={DocumentViewScreen} />
          </Stack.Navigator>
    );
}

export default DocumentScreen;