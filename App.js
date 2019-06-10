/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "react-native-firebase";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    this.checkNotificationsPermission();
    this.messageListener = firebase.messaging().onMessage(message => {});
  }

  componentWillUnmount() {
    this.messageListener();
  }

  checkNotificationsPermission = async () => {
    const notificationsPermissionGranted = await firebase
      .messaging()
      .hasPermission();

    if (!notificationsPermissionGranted) {
      this.requestNotificationsPermission();
    }
  };

  requestNotificationsPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      let fcmToken = await AsyncStorage.getItem("fcmToken");

      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem("fcmToken", fcmToken);
        }
      }
      // Pass token somewhere
      console.log(fcmToken);
    } catch (err) {
      console.log("Notifications permission rejected");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
