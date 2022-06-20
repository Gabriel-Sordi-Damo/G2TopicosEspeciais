import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import Screens from './Screens';
export default function SoftwareInfo(props) {

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
                <View style={styles.linha}>
                    <Text style={{ fontSize: 20 }}>
                        App feito com Expo. Expo foi escolhido devido as facilidades de uso,
                        levando-se em consideração principalmente os dipositivos móveis dos desenvolvedorers
                        que utilizam o sistema iOS.
                        A pasta principal do projeto é a "src". Dentro dela temos a pasta "components" que contém
                        os components mais reaproveitáveis do projeto. Na pasta "firebase" temos todos os arquivos
                        referentes à conexão com o back-end do Firebase. Na paste "screens" temos os arquivos .JS
                        para cada uma das telas do aplicativo. Dentro dessa pastas, temos também a pasta "User",
                        que contém os arquivos das telas nas quais ocorrem as principais interações do usuário com
                        a aplicação. Na pasta "services" temos os arquivos referentes aos serviços de requisição e pastas do Redux.
                        Na pasta "actions" temos as ações do Redux e na pasta "reducers" temos os reducers do Redux.
                    </Text>
                </View>
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
        alignItems: 'center',
    },
    linha: {
        backgroundColor: "#ffffff",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        textAlign: 'justify'
    },
});