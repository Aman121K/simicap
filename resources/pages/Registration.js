import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity
  } from 'react-native';


import Registration from './Registration';

const Stack = createNativeStackNavigator();

const RegisterScreen = ({navigation}) => {
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ phone, setPhone ] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput 
                    placeholder='Enter Name' 
                    value={name} 
                    style={styles.input} 
                    onChangeText = { text => setName(text) }
                />
                <TextInput 
                    placeholder='Enter email address' 
                    value={email} 
                    style={styles.input} 
                    onChangeText = { text => setEmail(text) }
                />
                <TextInput 
                    placeholder='Enter Phone Numer' 
                    value={phone} 
                    style={styles.input} 
                    onChangeText = { text => setPhone(text) }
                />
                <TextInput 
                    placeholder='Enter password' 
                    value={password} 
                    secureTextEntry 
                    style={styles.input} 
                    onChangeText = { text => setPassword(text) }
                />
                <TextInput 
                    placeholder='Enter Confirm Password' 
                    value={password} 
                    secureTextEntry 
                    style={styles.input} 
                    onChangeText = { text => setPassword(text) }
                />
                <Button title={'Register'} />
                <View style={{ flexDirection : 'row', marginTop: 20}}>
                    <Text style={styles.text}>Have an Account? </Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('Disconnettersi') }>
                        <Text style={{ color: 'red'}} >Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    text : {
        fontFamily: 'Poppins-Regular',
    }
});
export default RegisterScreen;