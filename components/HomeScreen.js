import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Vibration, Platform } from 'react-native';
import { Text, Title, Paragraph, Button } from 'react-native-paper';
import * as ExpoNotifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import * as BackgroundFetch from 'expo-background-fetch';

import { saveSession } from '../redux/actions';
import NotificationHandler from './NotificationHandler';
import { scheduler } from './NotificationHandler';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

  startHydrationSession = () => {
    const session = {
      interval: this.props.settings.interval,
      duration: this.props.settings.duration,
      startTime: Date.now(),
      // endTime: Date.now() + (this.props.settings.duration * 60 * 1000),
      endTime: Date.now() + 2 * 1000,
      paused: false,
      active: true
    }

    saveSession(session);

    const notification = {
      title: 'Hydration Time!',
      body: 'Drink a glass of water homie.',
      seconds: this.props.session.interval * 60,
    };

    scheduler(notification);
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
    settings: state.settings,
    session: state.session
  }
}

export default connect(
  mapStateToProps,
  { saveSession }
)(HomeScreen);