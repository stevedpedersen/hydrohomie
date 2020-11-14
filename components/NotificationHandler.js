import React, { Component } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

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
        // if (this.props.session.endTime > Date.now()) {

        // }
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'received',
                body: 'boidy'
            },
            trigger: {
                seconds: 10, //notification.interval * 60,
                repeats: false
            },
        });
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
            seconds: 10, //notification.interval * 60,
            repeats: false
        },
    });
};