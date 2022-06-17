import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as loginService from "../services/LoginService"
import { CheckBox } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../services/actions/user.action'

import Screens from './Screens';


export default function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberme] = useState(false);
    const dispatch = useDispatch()

    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.pop()} title="Voltar" />
            ),
        })
    }, [])

    const verifyRememberMe = async () => {
        let emailMemory = await AsyncStorage.getItem("email")
        let passwordMemory = await AsyncStorage.getItem("password")
        if (emailMemory) {
            setEmail(emailMemory)
            setPassword(passwordMemory)
            setRememberme(true)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                []
            ),
        })
    }, [])

    useLayoutEffect(() => {
        verifyRememberMe()
    }, [])

    const efetuarLogin = async () => {

        try {
            let user = await loginService.login(email, password)
            dispatch(UserAction.setUser(user))

            navigation.replace(Screens.FAVORITE_PLACES)
        } catch (error) {
            Alert.alert("Erro ao efetuar Loging", error)
        }
    }


    const lembrar = async () => {
        setRememberme(!rememberMe)

        if (!rememberMe) {
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem("password", password)

        } else {
            await AsyncStorage.removeItem("email")
            await AsyncStorage.removeItem("password")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Informe suas credenciais</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder='e-mail'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(e) => setEmail(e)}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='password'
                    autoCapitalize='none'
                    secureTextEntry
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                />
            </View>
            <View>
                <CheckBox
                    center
                    title="Lembre-me"
                    checked={rememberMe}
                    onPress={lembrar}
                />
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Button
                        title='Entrar'
                        onPress={efetuarLogin}
                    />
                </View>
                <View style={styles.coluna}>
                    <Button
                        title='Registre-se'
                        onPress={() => navigation.navigate(Screens.REGISTER_USER)}
                    />

                </View>
            </View>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "60%",
        padding: 3,
        borderRadius: 5
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        marginLeft: 5
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },

});