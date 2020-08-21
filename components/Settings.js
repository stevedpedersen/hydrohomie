import React, { Component } from 'react';
import {
    TextInput,
    Platform,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Chevron } from 'react-native-shapes';
import { Ionicons } from '@expo/vector-icons';
import { Text, Title, Paragraph, Button } from 'react-native-paper';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { connect } from 'react-redux';

import { saveSettings } from '../redux/actions';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const intervals = [
    {
        label: '120 minutes',
        value: '120',
    },
    {
        label: '60 minutes',
        value: '60',
    },
    {
        label: '30 minutes',
        value: '30',
    },
    {
        label: '15 minutes',
        value: '15',
    },
];
const durations = [
    {
        label: '12 Hours',
        value: '720',
    },
    {
        label: '9 Hours',
        value: '540',
    },
    {
        label: '6 Hours',
        value: '360',
    },
    {
        label: '3 Hours',
        value: '180',
    },
];

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            interval: this.props.settings.interval ?? '60',
            duration: this.props.settings.duration ?? '360'
        };
    }

    handleSubmit = () => {
        this.props.saveSettings({
            interval: this.state.interval,
            duration: this.state.duration
        });
        
        this.props.navigation.navigate('Home');
    }

    render() {
        const placeholder = {
            label: 'Select an interval',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}>

                    <RNPickerSelect
                        placeholder={placeholder}
                        items={intervals}
                        onValueChange={value => this.setState({ interval: value })}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={this.state.interval}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                        }}
                    />

                    <RNPickerSelect
                        placeholder={{...placeholder, label: "Select a duration"}}
                        items={durations}
                        onValueChange={value => this.setState({ duration: value })}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={this.state.duration}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                        }}
                    />

                    <Button 
                        onPress={this.handleSubmit}>
                        Submit
                    </Button>        

                </ScrollView>
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
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContentContainer: {
        paddingTop: 40,
        paddingBottom: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

function mapStateToProps(state) {
    return {
        settings: state.settings
    }
}

export default connect(
    mapStateToProps,
    { saveSettings }
)(Settings);