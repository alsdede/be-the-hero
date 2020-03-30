import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Incidents from './pages/Incidents'
import Detail from './pages/Detail'
import {Ionicons} from '@expo/vector-icons'

const AppStack = createStackNavigator();
const Bottom = createBottomTabNavigator();

export default function Routes() {
  return(
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown:false}}>
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail"component={Detail}/>        
      </AppStack.Navigator>
    </NavigationContainer>
  )

}