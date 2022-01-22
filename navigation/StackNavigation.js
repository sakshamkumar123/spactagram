import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./tabNavigator";
import StoryScreen from "../screens/StoryScreen"

const Stack = createStackNavigator()
const StackNavigator = ()=>{
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}> 
        <Stack.Screen name = "Home" component = {BottomTabNavigator}/>
        <Stack.Screen name= "StoryScreen" component = {StoryScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator