import { async } from '@firebase/util';
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as favoritePlaceServices from '../services/FavoritePlacesServices';





export default function FavoritePlace(props) {
    console.log("lugar favorito")
    console.log(props)


    return (
        <View style={styles.container}>
            <Button title='Desfavoritar' onPress={async () => await favoritePlaceServices.deleteFavoritePlace(props.key)} />
            <Text>
                {props.address}
            </Text>
            <Text>
                {props.description}
            </Text>
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