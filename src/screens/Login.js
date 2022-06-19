import React, { useState, useLayoutEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as loginService from "../services/LoginService"
import { CheckBox } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from 'react-redux';
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
                <Button onPress={() => navigation.navigate(Screens.ABOUT)} title="Sobre" />
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
            await AsyncStorage.setItem("email", email)
            await AsyncStorage.setItem("password", password)

        } else {
            await AsyncStorage.removeItem("email")
            await AsyncStorage.removeItem("password")
        }
    }

    return (
        <LinearGradient
            colors={["#fc825b", "#f25b50"]}
            start={[0.2, 0.2]}
            end={[0.7, 1]}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text
                    style={{ fontWeight: "bold", padding: 10 }}
                >
                    Informe suas credenciais
                </Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder='E-mail'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder='Senha'
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
                            title='Registrar'
                            onPress={() => navigation.navigate(Screens.REGISTER_USER)}
                        />

                    </View>
                </View>
                <StatusBar style="auto" />
            </View >
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    container: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "90%",
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 5,
        marginTop: 10,
        width: "80%",
        borderRadius: 5,
        padding: 7
    },
    linha: {
        flexDirection: "row",
        padding: 5
    },
    coluna: {
        flex: 1,
        marginLeft: 5
    },
});