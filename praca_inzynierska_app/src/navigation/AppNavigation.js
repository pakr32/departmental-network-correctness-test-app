import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Help from '../screens/Help';
import About from '../screens/About';
import Buildings from '../screens/Buildings';
import Rooms from '../screens/Rooms';
import Sockets from '../screens/Sockets';
import Socket from '../screens/Socket';
import AppConstants from '../styles/AppConstants';
import CustomDrawer from '../components/CustomDrawer';

const Stack = createStackNavigator ();

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Strona Główna';
  switch (routeName) {
    case 'Strona Główna':
      return 'Wybierz budynek';
    case 'Buildings':
      return 'Wybierz budynek';
    case 'Rooms':
      return 'Wybierz pokój';
    case 'Sockets':
        return 'Wybierz gniazdko';
    case 'Socket':
        return 'Informacje o gniazdku';
  }
}

function MainNavigator () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Buildings" component={Buildings} />
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Sockets" component={Sockets} />
      <Stack.Screen name="Socket" component={Socket} />

    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator ();

function DrawerStack () {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      drawerPosition="left"
      initialRouteName="MainNavigator"
      drawerStyle={{
        width: 250,
      }}

      screenOptions={{
        
        headerShown: true,
        
        drawerActiveBackgroundColor: AppConstants.COLORS.primary[100],
        drawerActiveTintColor: AppConstants.COLORS.primary[400],
        drawerInactiveTintColor: AppConstants.COLORS.primary[400],
        drawerLabelStyle: {
            fontFamily: AppConstants.FONTS.h4.fontFamily,
            fontSize: AppConstants.FONTS.h4.fontSize    
        }
      }}
    >

      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}

        options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            drawerIcon: 'home',
            title: 'Strona Główna'
        })}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
            drawerIcon: 'question',
            title: 'Pomoc'
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
            drawerIcon: 'info',
            title: 'O aplikacji'
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppContainer () {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
