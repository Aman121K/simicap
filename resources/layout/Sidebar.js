import React, { useState, useEffect } from "react";

import {
    View,
    ImageBackground,
    StyleSheet
} from 'react-native';

import {
    Avatar,
    Title,
    Drawer,
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from "../context/AuthContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContent(props) {

    const [userToken, setUserToken] = useState(null);
    const [userData, setuserData] = useState([]);

    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        (
            async () => {
                let userToken = await AsyncStorage.getItem('userToken');
                let userDatajosn = await AsyncStorage.getItem('userData');
                setUserToken(userToken);
                if (userToken != null) {
                    setuserData(JSON.parse(userDatajosn));
                }
            }
        )();
    });
    let bgimg = '../assets/images/bg_main.jpg';
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require(bgimg)} resizeMode="cover" style={{ flex: 1, alignSelf: 'stretch' }}>
                <DrawerContentScrollView {...props}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10, margin: 10 }}>
                        <View>
                            {userData.profile_image_url != '' ? <Avatar.Image source={{ uri: userData.profile_image_url }} avatarStyle={{ borderWidth: 0 }} /> : <Avatar.Image source={require('../assets/images/user.png')} />}
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Title style={{ marginLeft: 10, color: '#FFF', fontFamily: 'Montserrat-Regular', fontSize: 16 }}>{userData.user_name}</Title>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Drawer.Section>
                            <DrawerItemList {...props} />
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="ios-log-out-outline"
                                size={25}
                                color='#FFF'
                            />
                        )}
                        label="Disconnettersi"
                        onPress={() => { signOut() }}
                        inactiveTintColor='#FFF'
                        style={[styles.fontFamily, { marginLeft: 10 }]}
                    />
                </Drawer.Section>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Montserrat-Regular',
    },
});