import { StyleSheet, Text, View, Button, Alert, Dimensions, AllertButton } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../services/LoginService'
import * as favoritePlacesServices from '../services/FavoritePlacesServices'
import FavoritePlace from '../components/FavoritePlace'
import { useSelector } from 'react-redux'
import Screens from './Screens'


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
        <View>

            <View style={styles.fullDimensions}>

                <Button title={'Mapa de lugares felizes'} onPress={() => navigation.navigate(Screens.MAP_SCREEN)} />
                <Button title={'Atualizar'} onPress={async () => await searchHappyPlaces()} />
                <Text>
                    Lugares Favoritos:
                </Text>
                {getFavoritePlacesList()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    fullDimensions: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }

})