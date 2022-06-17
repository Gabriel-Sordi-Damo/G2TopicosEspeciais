import React from 'react'
import { StyleSheet, Text, View } from 'react-native';



export default function About(props) {


    return (
        <View style={styles.container}>
            <Text style={styles.linha}>
                Gabriel Sordi Damo, estudande de Ciências da Computação. Mais informações no Linkedin(https://www.linkedin.com/in/gabriel-sordi-damo-676ab5218/)
            </Text>
            <Text style={styles.linha}>
                Pedro Marchetti
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