import React, { useState, useLayoutEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as loginService from "../services/LoginService"
import Screens from './Screens';

export default function RegisterUser(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate(Screens.ABOUT)} title="Sobre" />
            ),
        })
    }, [])

    const completeRegistration = async () => {
        try {
            let answer = await loginService.createUser(email, password)
            Alert.alert(answer)
            navigation.navigate(Screens.LOGIN)
        } catch (error) {
            Alert.alert("Erro ao registrar usuário", error)
        }
    }

    return (
        <LinearGradient
            colors={["#f25b50", "#fc825b"]}
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
                <View style={styles.linha}>
                    <View style={styles.coluna}>
                        <Button
                            title='Registrar Usuário'
                            onPress={completeRegistration}
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
    }
});