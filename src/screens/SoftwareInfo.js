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
                    <Text>
                        App feito com Expo. Expo foi escolhido devido as facilidades de uso,
                        levando-se em consideração principalmente os dipositivos móveis dos desenvolvedorers
                        que utilizam o sistema iOS.
                        src
                        ---firebase: conexão com o back do Firebase
                        ---Components: componentes reaproveitaveis
                        ---Screens: as screens da aplicação
                        ---User: screens acessiveis somente a usuarios logados
                        ---screens acessiveis para qualquer usuario
                        ---Services: servicoes de requisição e pastas do Redux
                        ------actions: acções do redux
                        ------reducers: reducers do redux
                        ---interfaces de conexao dom back end
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
    },
});