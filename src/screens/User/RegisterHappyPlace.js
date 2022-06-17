import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import * as loginService from '../../services/LoginService'

import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import * as happlyPlaceService from "../../services/HappyPlacaServices"
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
        <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>Fale um pouco mais sobre esse local incrivel que você encontrou!</Text>
            <Text style={{ textAlign: "center" }}>{user.email}</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder='Endereço Completo'
                    value={form.address}
                    onChangeText={(value) => setForm(Object.assign({}, form, { address: value }))}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='O que torna esse local um local feliz?'
                    value={form.description}
                    onChangeText={(value) => setForm(Object.assign({}, form, { description: value }))}

                />
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Button
                        title='Registrar Local Feliz'
                        onPress={registerPlace}
                    />
                </View>
            </View>
            <StatusBar style="auto" />

            <FlatList
                data={happyPlaces}
                renderItem={({ item }) => <HappyPlaceDeleteComponent dados={item} navigation={navigation} />}
                keyExtractor={item => item.key}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
        //justifyContent: 'center',
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "99%",
        padding: 3,
        borderRadius: 5
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 5
    }
});