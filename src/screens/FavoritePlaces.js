import { StyleSheet, Text, View, Button, Alert, Dimensions, AllertButton } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../services/LoginService'
import * as happlyPlaceService from '../services/HappyPlacaServices'
import * as favoritePlaceServices from '../services/FavoritePlacesServices'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Screens from './Screens'


export default function FavoritePlaces(props) {

    const user = useSelector(store => store.user)
    const { navigation } = props

    const [happyPlaces, setHappyPlaces] = useState([])
    const [location, setLocation] = useState({
        coords: {
            latitude: -28.2857919,
            longitude: -52.7888171,
        }
    })

    const searchHappyPlaces = async () => {
        try {
            let data = await happlyPlaceService.getFavoritePlaceUid(user.uid)
            setHappyPlaces(data)
        } catch (error) {

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


    return (
        <View>
            <View style={{
                position: "absolute",
                top: "80%",
                alignSelf: "flex-end",
                paddingRight: 10

            }}>
                <Button title='+ Lugar Feliz' onPress={() => navigation.navigate(Screens.REGISTER_HAPPY_PLACE)} />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }

})