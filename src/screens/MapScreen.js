import { StyleSheet, Text, View, Button, Alert, Dimensions, AllertButton } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../services/LoginService'
import * as happlyPlaceService from '../services/HappyPlacaServices'
import * as favoritePlaceServices from '../services/FavoritePlacesServices'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Screens from './Screens'


export default function MapScreen(props) {

  const user = useSelector(store => store.user)
  const { navigation } = props

  const [happyPlaces, setHappyPlaces] = useState([])
  const [location, setLocation] = useState({
    coords: {
      latitude: -28.2857919,
      longitude: -52.7888171,
    }
  })

  const myPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //setar uma msg de erro...
      return
    } else {
      let myLocation = await Location.getCurrentPositionAsync({})
      setLocation(myLocation)
    }

  }

  const searchHappyPlaces = async () => {
    try {
      let data = await happlyPlaceService.getHappyPlaces()
      setHappyPlaces(data)
    } catch (error) {

    }
  }

  useEffect(() => {
    myPosition()
    searchHappyPlaces()
    //console.log(props)

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}

      >
        {location && <Marker
          coordinate={
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }
          }
          title={user.email}
          icon={require("../../assets/my-location-icon.jpg")}

        />}

        {happyPlaces.map((happyPlace, key) => <Marker

          key={key}
          coordinate={{
            latitude: happyPlace.lat,
            longitude: happyPlace.lng
          }}
          title={happyPlace.address}
          icon={require("../../assets/pet-position.png")}
          onPress={() => Alert.alert(happyPlace.address,
            `Descrição: ${happyPlace.description}\n`,
            [{ text: "OK", onPress: () => "Continue" },
            {
              text: "Make Favorite", onPress: function () {
                happyPlace.uid = user.uid
                favoritePlaceServices.createFavoriteHappyPlace(happyPlace)
              }
            }])
          }

        />)}

      </MapView>
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