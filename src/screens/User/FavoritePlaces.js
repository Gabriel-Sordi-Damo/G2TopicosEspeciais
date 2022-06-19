import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../../services/LoginService'
import * as favoritePlacesServices from '../../services/FavoritePlacesServices'
import FavoritePlace from '../../components/FavoritePlaceComponent'
import { useSelector } from 'react-redux'
import Screens from '../Screens'

export default function FavoritePlaces(props) {

    const user = useSelector(store => store.user)
    const { navigation } = props
    const [happyPlaces, setHappyPlaces] = useState([])

    const searchHappyPlaces = async () => {
        console.log(user.uid)
        try {
            let data = await favoritePlacesServices.getFavoritePlaceUid(user.uid)
            console.log("favoritePlaces")
            console.log(data)
            setHappyPlaces(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        searchHappyPlaces()
    }, [props])

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

    function getFavoritePlacesList() {
        let list = []
        for (let favoritePlace of happyPlaces)
            list.push(FavoritePlace(favoritePlace))
        return list
    }

    return (
        <LinearGradient
            colors={["#f25b50", "#fc825b"]}
            start={[0.2, 0.2]}
            end={[0.7, 1]}
            style={styles.background}
        >
            <View>
                <View style={styles.fullDimensions}>
                    <View style={styles.botao}>
                        <Button title={'Mapa de lugares felizes'} onPress={() => navigation.navigate(Screens.HAPY_PLACES)} />
                    </View>
                    <View style={styles.botao}>
                        <Button title={'Atualizar'} onPress={async () => await searchHappyPlaces()} />
                    </View>
                    <View style={styles.lista}>
                        <Text style={{ fontWeight: "bold" }}>
                            Lugares Favoritos:
                        </Text>
                        <Text style={{ fontSize: 13, marginTop: 5 }}>
                            {getFavoritePlacesList().length === 0 ? "Nenhum registro" : getFavoritePlacesList()}
                        </Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
    },
    fullDimensions: {
        paddingTop: 20,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: 'center'
    },
    botao: {
        backgroundColor: "#ffffff",
        width: "70%",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        margin: 5
    },
    lista: {
        backgroundColor: "#ffffff",
        width: "70%",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    }
})