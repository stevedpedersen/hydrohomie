import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Vibration, Platform } from 'react-native';
import { Text, Title, Paragraph, Button } from 'react-native-paper';
import * as ExpoNotifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as BackgroundFetch from 'expo-background-fetch';

import NotificationHandler from './NotificationHandler';
import { scheduler } from './NotificationHandler';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

  _isMounted = false;
  notificationListener = null;
  responseListener = null;

  // state = {
  //   expoPushToken: '',
  //   notification: {},
  // };

  constructor(props) {
    super(props);

    this.state = {
        interval: this.props.settings.interval ?? '60',
        duration: this.props.settings.duration ?? '360',
        expoPushToken: '',
        notification: {}
    };
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    // this.registerForPushNotificationsAsync();

    if (this._isMounted) {

      ExpoNotifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // this._notificationSubscription = Notifications.addListener(this._handleNotification);
      this.notificationListener = ExpoNotifications.addNotificationReceivedListener(
        this._handleNotification
      );
      
      // This listener is fired whenever a user taps on or interacts with a notification 
      // (works when app is foregrounded, backgrounded, or killed)
      this.responseListener = ExpoNotifications.addNotificationResponseReceivedListener(
        this._handleNotificationResponse
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    ExpoNotifications.removeNotificationSubscription(this.notificationListener);
    ExpoNotifications.removeNotificationSubscription(this.responseListener);
  }

  _handleNotification = async notification => {
    let data = notification.request.content.data;
  };

  _handleNotificationResponse = response => {
    let data = response.notification.request.content.data;

    // Dismiss notification from Notification Center tray
    ExpoNotifications.dismissNotificationAsync(data.id);
  };

  startHydrationSession = () => {
    const notification = {
      title: 'Hydration Time!',
      body: 'Drink a glass of water homie.',
      expiration: Math.round(((new Date).getTime() + this.props.settings.duration * 60) / 1000),
      android: { sound: true }, // Make a sound on Android
      ios: { sound: true }, // Make a sound on iOS
    };

    scheduler(notification);
    
    // const notification = {
    //   title: 'Hydration Time!',
    //   body: 'Drink a glass of water homie.',
    //   expiration: Math.round(((new Date).getTime() + this.props.settings.duration * 60) / 1000),
    //   android: { sound: true }, // Make a sound on Android
    //   ios: { sound: true }, // Make a sound on iOS
    // };

    // const options = {
    //   // time: Date.now() + 10000, // Schedule it in 10 seconds
    //   // repeat: 'day', // Repeat it daily
    //   time: Date.now() + (this.state.interval * 1000)
    // };

    // Notifications.scheduleLocalNotificationAsync(notification, options);
  }

  render() {
    return (
      <View style={styles.container}>
        <NotificationHandler />
        <ImageBackground source={require('../assets/images/icewater.jpg')} style={styles.image}>
          <View style={styles.innerContainer}>
            <View style={styles.card}>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.startHydrationSession()}
                  style={styles.button}
                  icon="cup-water"
                  mode="contained">
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hydrate Me</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.props.navigation.navigate('Settings')}
                  style={{ ...styles.button, backgroundColor: '#3943B7' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Settings</Text>
                </Button>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Origin: {this.state.notification.origin}</Text>
                <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: deviceHeight / 3,
    // marginHorizontal: 20,
    // width: deviceWidth * 0.8,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, .75)',
    // opacity: .75,
    borderRadius: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  textContainer: {

  },
  text: {
    textAlign: 'center',
    color: "#000",
    fontSize: 50,
    fontWeight: "bold"
  },
  buttonContainer: {
    paddingVertical: 10
  },
  button: {
    backgroundColor: '#61dafb',
    paddingVertical: 6,
    width: '90%',
    alignSelf: 'center'
  }
});

function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

export default connect(
  mapStateToProps,
  {  }
)(HomeScreen);