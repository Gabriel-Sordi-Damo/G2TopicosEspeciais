import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import * as petService from '../services/HappyPlacaServices'

import Screens from '../screens/Screens'

export default function Registro(props) {

    const data = props.dados

    const excluirPet = () => {


        Alert.alert("Deseja Excluir:", "Esses dados serão apagados para sempre!", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "OK", onPress: async () => {
                    try {
                        await petService.deleteHappyPlace(data.key)
                        Alert.alert("Dados Excluídos com Sucesso")
                        props.navigation.navigate(Screens.MAP_SCREEN, { atualizar: true })
                    } catch (error) {
                        Alert.alert("Você não possui permissão para excluir esse registro!")
                    }
                }
            }
        ])

    }


    return (
        <View style={styles.container}>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Text style={styles.campo}>Nome do Pet:</Text>
                    <Text>{data.address}</Text>
                </View>
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Text style={styles.campo}>Endereço:</Text>
                    <Text>{data.description}</Text>
                </View>
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                </View>
                <View style={styles.coluna}>
                </View>
                <View style={styles.coluna}>
                    <Button title='Excluir' color={'red'} onPress={excluirPet} />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        margin: 5
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        flexDirection: "row"
    },
    campo: {
        width: 90
    }

})