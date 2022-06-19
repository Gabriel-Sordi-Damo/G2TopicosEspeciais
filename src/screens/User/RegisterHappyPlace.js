import React, { useState, useLayoutEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import * as loginService from '../../services/LoginService'
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import * as happlyPlaceService from "../../services/HappyPlaceServices"
import HappyPlaceDeleteComponent from '../../components/HappyPlaceDeleteComponent';
import { useDispatch, useSelector } from 'react-redux';
import Screens from '../Screens';

export default function RegisterHappyPlace(props) {

    const [form, setForm] = useState({})
    const { navigation } = props
    const [happyPlaces, setHappyPlaces] = useState([])
    const user = useSelector(store => store.user)

    const logoff = async () => {
        try {
            await loginService.logoff()
            navigation.replace(Screens.LOGIN)
        } catch (error) {
            Alert.alert(error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: user.email,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontSize: 15
            },
            headerRight: () => <Button title='Logoff' onPress={logoff} />
        })
    }, [])

    const findHappyPlaces = async () => {
        try {
            let dados = await happlyPlaceService.getHappyPlaceUid(user.uid)
            //console.log(dados)
            setHappyPlaces(dados)
        } catch (error) {
            console.log(error);
        }
    }

    useLayoutEffect(() => {
        findHappyPlaces()
    }, [])

    const registerPlace = async () => {
        if (form.description && form.address) {
            try {
                await happlyPlaceService.createHappyPlace(form, user.uid)
                Alert.alert("Dados Registrados com Sucesso")
                setForm({})
                navigation.navigate(Screens.HAPY_PLACES, { update: true })
            } catch (error) {
                Alert.alert("Erro ao registrar", "Verifique os campos, em especial o endereço!")
            }
        } else {
            Alert.alert("Campos não preenchidos corretamente!")
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
                <Text style={{ textAlign: "center", color: "#ffffff" }}>Fale um pouco mais sobre esse local incrivel que você encontrou!</Text>
                {/* <Text style={{ textAlign: "center" }}>{user.email}</Text> */}
                <View style={styles.input}>
                    <TextInput
                        placeholder='Endereço Completo'
                        placeholderTextColor={"gray"}
                        value={form.address}
                        onChangeText={(value) => setForm(Object.assign({}, form, { address: value }))}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder='O que torna esse local um local feliz?'
                        placeholderTextColor={"gray"}
                        value={form.description}
                        onChangeText={(value) => setForm(Object.assign({}, form, { description: value }))}
                    />
                </View>
                <View style={styles.botao}>
                    <Button
                        title='Registrar Local Feliz'
                        onPress={registerPlace}
                    />
                </View>
                <FlatList
                    data={happyPlaces}
                    renderItem={({ item }) => <HappyPlaceDeleteComponent dados={item} navigation={navigation} />}
                    keyExtractor={item => item.key}
                />
                <StatusBar style="auto" />
            </View >
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
    },
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
        alignContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 5,
        marginTop: 10,
        width: "80%",
        borderRadius: 5,
        padding: 7,
        alignSelf: "center",
    },
    botao: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        width: "70%",
        alignSelf: "center"
    }
});