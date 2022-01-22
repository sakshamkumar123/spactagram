import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import firebase from "firebase";


export default class Logout extends Component{
    componentDidMount(){firebase.auth().signOutOf}
    render(){
        return(
            <View>
                <Text>Logout</Text>
            </View>

        )
    }
}

