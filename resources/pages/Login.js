import React, { useContext, useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar
} from 'react-native';

import axios from "axios";

import DeviceInfo from 'react-native-device-info';

import { API_BASE_URL } from './config';

import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);

    let deviceId = DeviceInfo.getDeviceId();
    let deviceType = DeviceInfo.getDeviceType();

    const { signIn } = React.useContext(AuthContext);

    const loginHandle = (email, password) =>{
        //signIn();
        let formData = {
            email_id : email,
            password : password,
            device_id : deviceId,
            device_type : deviceType,
        };
        axios({
            url: `${API_BASE_URL}/signIn`,
            method: 'POST',
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            if(res.data.status == 1){
                let userInfo = JSON.stringify(res.data.user_details);
                let result = JSON.parse(userInfo);
                signIn(result['user_id'], userInfo);
            }else{
                Alert.alert(
                    "Warning",
                    "Sorry, Email or Password Invalid",
                    [
                      { text: "OK" }
                    ]
                );
            }
          
        }).catch(e => {
            Alert.alert(
                "Warning",
                "Somthing went wrong, Try Again",
                [
                  { text: "OK" }
                ]
            );
        });
    }

    let bgimg = '../assets/images/bg_login.jpeg';

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#04487b' hidden={false} />
            <ImageBackground source={require(bgimg)} resizeMode="cover" style={{ flex: 1, alignSelf: 'stretch' }}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <TextInput 
                            placeholder='Enter email address' 
                            value={email} 
                            style={[styles.input, styles.fontFamily ]}
                            onChangeText = { text => setEmail(text) }
                        />
                        <TextInput 
                            placeholder='Enter password' 
                            value={password} 
                            secureTextEntry 
                            style={[styles.input, styles.fontFamily ]}
                            onChangeText = { text => setPassword(text) }
                        />
                        <Button
                            title="Login"
                            color="#04487b"
                            style={styles.fontFamily}
                            onPress={ () => { loginHandle(email, password) } }
                        />
                        <View style={{ flexDirection : 'row', marginTop: 20}}>
                            <Text style={styles.fontFamily}>Forgot Password? </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    wrapper : {
        width : '80%',
    },
    input : {
        marginBottom : 12,
        borderWidth : 1,
        borderColor : '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    Link : {
        color: 'blue',
    },
    fontFamily :{
        fontFamily: 'Montserrat-Regular',
    },
    backgroundColor : {
        backgroundColor : '#900'
    }
});
export default LoginScreen;