import React, { Component } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { resetSession } from './actions';

class NotificationHandler extends Component {

    _isMounted = false;
    notificationListener = null;
    responseListener = null;

    state = {
        notification: {},
    };

    componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {

            this.registerForPushNotificationsAsync();

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            this.notificationListener = Notifications.addNotificationReceivedListener(
                this._handleNotification
            );

            // This listener is fired whenever a user taps on or interacts with a notification 
            // (works when app is foregrounded, backgrounded, or killed)
            this.responseListener = Notifications.addNotificationResponseReceivedListener(
                this._handleNotificationResponse
            );
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        Notifications.removeNotificationSubscription(this.notificationListener);
        Notifications.removeNotificationSubscription(this.responseListener);
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

    _handleNotification = notification => {

        let getRoundedMinutes = (minutes, date=new Date()) => {

            let ms = 1000 * 60 * minutes; // convert minutes to ms
            let roundedDate = new Date(Math.round(date.getTime() / ms) * ms);

            return roundedDate;
        }

        let getRoundedHours = (hours, date=new Date()) => {

            let ms = 1000 * hours; // convert hours to ms
            let roundedDate = new Date(Math.round(date.getTime() / ms) * ms);

            return roundedDate;
        }
        
        // Session has not ended
        if (this.props.session.endTime > Date.now()) {

            const hoursLeft = Math.floor((this.props.session.endTime - Date.now()) / 1000 / 60 / 60);
            const minutesLeft = Math.floor((this.props.session.endTime - Date.now()) / 1000 / 60);

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Drink water homie!',
                    body: `You have ${hoursLeft} hours and ${minutesLeft} minutes until your next water drink`
                },
                trigger: {
                    seconds: this.props.session.interval * 60, //notification.interval * 60,
                    repeats: false
                },
            });

        } else if (this.props.session.active) {

            resetSession();

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Session Ended.',
                    body: `Though your session is over, why not drink another delicious glass?`
                },
                trigger: {
                    seconds: 1,
                    repeats: false
                },
            });

        } else {

            Notifications.cancelAllScheduledNotificationsAsync();
        }
    };

    _handleNotificationResponse = response => {
        console.log('NOTIFICATION RESPONSE', response);
        Notifications.cancelAllScheduledNotificationsAsync();
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
        return null;
    }
}

export default NotificationHandler;


export function scheduler(notification) {
    Notifications.scheduleNotificationAsync({
        content: {
            title: notification.title,
            body: notification.body
        },
        trigger: {
            seconds: this.props.session.interval * 60,
            repeats: false
        },
    });
};

function mapStateToProps(state) {
    return {
        session: state.session
    }
}

export default connect(
    mapStateToProps,
    { }
)(HomeScreen);