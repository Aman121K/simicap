import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Switch,
  TouchableOpacity
} from 'react-native';

import {
    Avatar,
    Title,
    Paragraph,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";
const SettingScreen = ({navigation}) => {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { signOut } = React.useContext(AuthContext);
    useEffect( () => { (
        async() => { 
            let userToken = await AsyncStorage.getItem('userToken');
            let userDatajosn = await AsyncStorage.getItem('userData');
            setUserToken(userToken);
            if(userToken !=null){
                setUserData(JSON.parse(userDatajosn));
            }
        } 
        ) ();
    });
    
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#04487b' hidden={false} />
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DDD', paddingBottom: 15, alignContent:'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Ionicons name="ios-notifications-outline" size={25} color='#333'style={{alignSelf: 'flex-start'}}/>
                    <Paragraph style={[styles.fontFamily, { marginLeft: 10 } ]}>Notifiche</Paragraph>
                  </View>
                  <Switch
                      trackColor={{ false: "#767577", true: "#04487b" }}
                      thumbColor={isEnabled ? "#B31817" : "#f4f3f4"}
                      ios_backgroundColor="#04487b"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                      style={{ alignSelf: 'flex-end'}}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DDD', paddingBottom: 15, alignContent:'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Ionicons name="ios-key-outline" size={25} color='#333'style={{alignSelf: 'flex-start'}}/>
                    <Paragraph style={[styles.fontFamily, { marginLeft: 10 } ]}>Modifica Password</Paragraph>
                  </View>
                  <TouchableOpacity>
                      <Ionicons name="ios-chevron-forward-sharp" size={25} color='#777'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DDD', paddingBottom: 15, alignContent:'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start'}}>
                    <Ionicons name="ios-exit-outline" size={25} color='#333'style={{alignSelf: 'flex-start'}}/>
                    <Paragraph style={[styles.fontFamily, { marginLeft: 10 } ]}>Disconnettersi</Paragraph>
                  </View>
                  <TouchableOpacity onPress={() => { signOut() }}>
                      <Ionicons name="ios-chevron-forward-sharp" size={25} color='#777'/>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    );
} 

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
      fontFamily : 'Montserrat-Regular'
    }
});

export default SettingScreen;