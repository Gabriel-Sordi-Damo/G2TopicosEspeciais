import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import * as loginService from '../services/LoginService'
import * as petService from '../services/PetService'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'

export default function Menu(props) {

  const user = useSelector(store => store.user)
  const { navigation } = props

  const [pets, setPets] = useState([])
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

  const buscarPets = async () => {
    try {
      let dados = await petService.getPets()
      //console.log(dados)
      setPets(dados)
    } catch (error) {

    }
  }



  const logoff = async () => {

    try {
      await loginService.logoff()
      navigation.replace("Login")
    } catch (error) {
      Alert.alert(error)
    }

  }


  useEffect(() => {
    myPosition()
    buscarPets()
    //console.log(props)

  }, [props])


  useLayoutEffect(() => {


    navigation.setOptions({
      title: user.email,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15
      },
      //headerLeft: () => <Button title='+' onPress={() => navigation.navigate("CadastroPet")} />,
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

        {pets.map((pet, key) => <Marker

          key={key}
          coordinate={{
            latitude: pet.lat,
            longitude: pet.lng
          }}
          title={pet.nome_pet}
          icon={require("../../assets/pet-position.png")}
          onPress={() => Alert.alert(pet.nome_pet,
            `Tutor: ${pet.nome_tutor}\nDescrição: ${pet.descricao}\nEndereço: ${pet.endereco}\nContato: ${pet.contato} `)}

        />)}

      </MapView>
      <View style={{
        position: "absolute",
        top: "80%",
        alignSelf: "flex-end",
        paddingRight: 10

      }}>
        <Button title='+ Pet' onPress={() => navigation.navigate("CadastroPet")} />
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