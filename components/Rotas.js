import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../components/SplashScreen';
import Home from '../components/Home';
import Cadastro from '../components/Cadastro';
import Alterar from '../components/Alterar';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Alterar" component={Alterar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
