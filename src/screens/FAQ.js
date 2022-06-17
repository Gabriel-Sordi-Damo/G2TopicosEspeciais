import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';



export default function FAQ(props) {

    const { navigation } = props

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate(Screens.ABOUT)} title="Sobre" />
            ),
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.linha}>
                Ao fazer login no app é possível adicinar um local que te deixa feliz no mapa,
                junto de uma descrição do porque disso.
            </Text>
            <Text>
                Também é possível favoritar lugares que te deixam feliz que foram adicinados por
                você ou outras pessoas.
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