import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AssetListingScreen from './Listing';
import AssetAddScreen from './Add';
import AssetEditScreen from './Edit';
import AssetViewScreen from './View';
import ViewAssetHistory from './HistoryView';
import ViewAssetMaintenace from './MaintenanceView';
import ViewAssetBooking from './BookingView';

const Stack = createNativeStackNavigator();

const AssetScreen = ({navigation}) => {
    return(
          <Stack.Navigator initialRouteName="AssetsListing">
              <Stack.Screen name="AssetsListing" component={AssetListingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AddAsset" component={AssetAddScreen} options={{ headerShown: false }} />
              <Stack.Screen name="EditAsset" component={AssetEditScreen} />
              <Stack.Screen name="ViewAsset" component={AssetViewScreen} />
              <Stack.Screen name="ViewAssetHistory" component={ViewAssetHistory} />
              <Stack.Screen name="ViewAssetMaintenance" component={ViewAssetMaintenace} />
              <Stack.Screen name="ViewAssetBooking" component={ViewAssetBooking} />
          </Stack.Navigator>
    );
}

export default AssetScreen;