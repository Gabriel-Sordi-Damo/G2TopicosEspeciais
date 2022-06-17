import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native';
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
        <View style={styles.container}>
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
                renderItem={({ item }) => <Button
                    style={styles.item}
                    onPress={() => navigation.navigate(item.navigateTo)}
                    title={item.pageName} />}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

});