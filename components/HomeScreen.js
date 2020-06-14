import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Vibration, Platform } from 'react-native';
import { Text, Title, Paragraph, Button } from 'react-native-paper';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as BackgroundFetch from 'expo-background-fetch';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

  state = {
    expoPushToken: '',
    notification: {},
  };

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
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/icewater.jpg')} style={styles.image}>
          <View style={styles.innerContainer}>
            <View style={styles.card}>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.sendPushNotification()}
                  style={styles.button}
                  icon="cup-water"
                  mode="contained">
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hydrate Me</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.props.navigation.navigate('Settings')}
                  style={{...styles.button, backgroundColor: '#3943B7'}}>
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

export default HomeScreen;