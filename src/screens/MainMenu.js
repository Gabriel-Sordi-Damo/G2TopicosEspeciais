import React, { useLayoutEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Button, Image } from 'react-native';
import Screens from './Screens';

export default function MainMenu(props) {

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
            colors={["#fc825b", "#f25b50"]}
            start={[0.2, 0.2]}
            end={[0.7, 1]}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.imagem}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={{ width: 250, height: 200, resizeMode: 'contain', }} />
                </View>
                <FlatList
                    data={[
                        {
                            navigateTo: Screens.LOGIN,
                            pageName: "Login"
                        },
                        {
                            navigateTo: Screens.SOFTWARE_INFO,
                            pageName: "Informações do Software"
                        },
                        {
                            navigateTo: Screens.FAQ,
                            pageName: "FAQ"
                        },
                    ]}
                    renderItem={({ item }) =>
                        <View style={styles.item}>
                            <Button
                                onPress={() => navigation.navigate(item.navigateTo)}
                                title={item.pageName}
                            />
                        </View>
                    }
                />
                <StatusBar style="auto" />
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
    imagem: {
        marginBottom: 20
    },
    item: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        margin: 5
    }
});