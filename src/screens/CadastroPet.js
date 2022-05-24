import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as petService from "../services/PetService"

export default function CadastroPet(props) {

    const [form, setForm] = useState({})
    const { navigation } = props

    const efetuarCadastro = async () => {
        try {
            let retorno = await petService.createPet(form)
            Alert.alert("Dados Registrados com Sucesso")
            setForm({})
            navigation.navigate("Menu")
        } catch (error) {
            Alert.alert("Erro ao registrar", error)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>Informe os dados o Pet desaparecido:</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder='Nome do Tutor'
                    value={form.nome_tutor}
                    onChangeText={(value) => setForm(Object.assign({}, form, { nome_tutor: value }))}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Forma de Contato'
                    value={form.contato}
                    onChangeText={(value) => setForm(Object.assign({}, form, { contato: value }))}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Nome do Pet'
                    value={form.nome_pet}
                    onChangeText={(value) => setForm(Object.assign({}, form, { nome_pet: value }))}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Descrição do Pet'
                    value={form.descricao}
                    onChangeText={(value) => setForm(Object.assign({}, form, { descricao: value }))}

                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Endereço Completo'
                    value={form.endereco}
                    onChangeText={(value) => setForm(Object.assign({}, form, { endereco: value }))}

                />
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Button
                        title='Registrar Pet'
                        onPress={efetuarCadastro}
                    />
                </View>
            </View>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
        //justifyContent: 'center',
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "99%",
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