import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import MapScreen from './src/screens/MapScreen';
import RegisterUser from './src/screens/UserRegistration';
import RegisterHappyPlace from './src/screens/RegisterHappyPlace';
import FavoritePlaces from './src/screens/FavoritePlaces';
import AppInfo from './src/screens/AppInfo';
import Screens from './src/screens/Screens';
import SoftwareInfo from './src/screens/SoftwareInfo';
import MainMenu from './src/screens/MainMenu';
import { Provider as StoreProvider } from 'react-redux';
import { LogBox } from 'react-native';
import store from './src/services/store'

LogBox.ignoreLogs([
  'AsyncStorage'
])

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <StoreProvider store={store}>

      <NavigationContainer>

        <Stack.Navigator initialRouteName={Screens.MAIN_MENU}>

          <Stack.Screen
            name={Screens.MAIN_MENU}
            component={MainMenu}
            options={
              { title: "Menu Principal" }
            }
          />
          <Stack.Screen
            name={Screens.APP_INFO}
            component={AppInfo}
            options={
              { title: "Informações" }
            }
          />
          <Stack.Screen
            name={Screens.SOFTWARE_INFO}
            component={SoftwareInfo}
            options={
              { title: "Informações do software" }
            }
          />
          <Stack.Screen
            name={Screens.LOGIN}
            component={Login}
            options={
              { title: "Login" }
            }
          />
          <Stack.Screen
            name={Screens.MAP_SCREEN}
            component={MapScreen}
            options={
              { title: "Lugares Felizes" }
            }
          />
          <Stack.Screen
            name={Screens.REGISTER_USER}
            component={RegisterUser}
            options={
              { title: "Registro de Usuários" }
            }
          />
          <Stack.Screen
            name={Screens.FAVORITE_PLACES}
            component={FavoritePlaces}
            options={
              { title: "Lugares Favoritos" }
            }
          />
          <Stack.Screen
            name={Screens.REGISTER_HAPPY_PLACE}
            component={RegisterHappyPlace}
            options={
              {
                title: "Registro de Lugar Feliz",
                headerTitleStyle: {
                  fontSize: 15
                }
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}


