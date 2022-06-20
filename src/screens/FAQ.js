import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

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
        <LinearGradient
            colors={["#f25b50", "#fc825b"]}
            start={[0.2, 0.2]}
            end={[0.7, 1]}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.linha}>
                    <Text style={{ fontSize: 20 }}>
                        Ao fazer login no app é possível adicionar um local no mapa que te deixa feliz,
                        junto de uma descrição do porque disso. Também é possível favoritar lugares que foram adicinados por
                        você ou por outras pessoas.
                    </Text>
                </View>
            </View >
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%",
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center",
    },
    linha: {
        backgroundColor: "#ffffff",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
});