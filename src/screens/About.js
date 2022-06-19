import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function About(props) {
    return (
        <LinearGradient
            colors={["#f4a84e", "#dd4b40"]}
            start={[0.2, 0.2]}
            end={[0.7, 1]}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.perfil}>
                    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                        <Image
                            source={require("../../assets/gabriel-perfil.jpg")}
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontWeight: "bold" }}>Gabriel Sordi Damo</Text>
                        <Text>
                            Estudante de Ciências da Computação.
                            Mais informações no Linkedin (https://www.linkedin.com/in/gabriel-sordi-damo-676ab5218/)
                        </Text>
                    </View>
                </View>
                <View style={styles.perfil}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Image
                            source={require("../../assets/pedro-perfil.jpg")}
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontWeight: "bold" }}>Pedro Marchetti Casteli</Text>
                        <Text >
                            Estudante de Ciências da Computação.
                            Mais informações no Linkedin (https://www.linkedin.com/in/pedro-marchetti-casteli-1681b9122/)
                        </Text>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
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
        alignItems: 'center',
        padding: 10
    },
    perfil: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 5,
        marginTop: 15,
        color: "#ffffff",
        borderRadius: 5
    },
});