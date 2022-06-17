import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

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
        <View style={styles.container}>
            <Text style={styles.linha}>
                App feito com Expo. Expo foi escolhido devido as facilidades de uso,
                levando-se em consideração principalmente os dipositivos móveis dos desenvolvedorers
                que não são Android.
            </Text>
            <Text>
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