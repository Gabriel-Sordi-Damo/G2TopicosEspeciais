import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import HapyPlaces from './src/screens/User/HapyPlaces';
import RegisterUser from './src/screens/UserRegistration';
import RegisterHappyPlace from './src/screens/User/RegisterHappyPlace';
import FavoritePlaces from './src/screens/User/FavoritePlaces';
import Screens from './src/screens/Screens';
import SoftwareInfo from './src/screens/SoftwareInfo';
import About from './src/screens/About';
import MainMenu from './src/screens/MainMenu';
import FAQ from './src/screens/FAQ'
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
            name={Screens.FAQ}
            component={FAQ}
            options={
              { title: "FAQ" }
            }
          />
          <Stack.Screen
            name={Screens.ABOUT}
            component={About}
            options={
              { title: "Sobre" }
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
            name={Screens.HAPY_PLACES}
            component={HapyPlaces}
            options={
              { title: "Mapa dos Lugares Felizes" }
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


