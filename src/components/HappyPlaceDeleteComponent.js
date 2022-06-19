import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import * as petService from '../services/HappyPlaceServices'

import Screens from '../screens/Screens'

export default function HappyPlaceDeleteComponent(props) {

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
                        props.navigation.navigate(Screens.HAPY_PLACES, { atualizar: true })
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
                    <Text style={{ flex: 2, textTransform: "uppercase", fontWeight: "bold" }}>Nome do Lugar:</Text>
                    <Text style={{ flex: 3 }}>{data.address}</Text>
                </View>
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Text style={{ flex: 2, textTransform: "uppercase", fontWeight: "bold" }}>Motivo:</Text>
                    <Text style={{ flex: 3 }}>{data.description}</Text>
                </View>
            </View>
            <View style={styles.botao}>
                <Button title='Excluir' color={'red'} onPress={excluirPet} />
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
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        marginTop: 5
    },
    coluna: {
        flex: 1,
        flexDirection: "row"
    },
    botao: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 5,
        marginTop: 5,
        width: "50%"
    },
})