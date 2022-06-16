import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


export default function SoftwareInfo(props) {

    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.pop()} title="Voltar" />
            ),
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>
                src
                ---back-end: conexão com o back do Firebase
                ---Components: componentes reaproveitaveis
                ---Screens: as screens da aplicação
                ---Services: servicoes de requisição e pastas do Redux
                ------actions: acções do redux
                ------reducers: reducers do redux
            </Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "60%",
        padding: 3,
        borderRadius: 5
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        marginLeft: 5
    }

});