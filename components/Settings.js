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

class Settings extends Component {

    constructor(props) {
        super(props);

        this.inputRefs = {
            firstTextInput: null,
            favSport0: null,
            favSport1: null,
            lastTextInput: null,
            favSport5: null,
        };

        this.state = {
            numbers: [
                {
                    label: '1',
                    value: 1,
                    color: 'orange',
                },
                {
                    label: '2',
                    value: 2,
                    color: 'green',
                },
            ],
            favSport0: undefined,
            favSport1: undefined,
            favSport2: undefined,
            favSport3: undefined,
            favSport4: 'baseball',
            previousFavSport5: undefined,
            favSport5: null,
            favNumber: undefined,
        };

        this.InputAccessoryView = this.InputAccessoryView.bind(this);
    }

    componentDidMount() {
        var that = this;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        that.setState({
            //Setting the value of the date time
            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }

    InputAccessoryView() {
        return (
            <View style={defaultStyles.modalViewMiddle}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState(
                            {
                                favSport5: this.state.previousFavSport5,
                            },
                            () => {
                                this.inputRefs.favSport5.togglePicker(true);
                            }
                        );
                    }}
                    hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <View testID="needed_for_touchable">
                        <Text
                            style={[
                                defaultStyles.done,
                                { fontWeight: 'normal', color: 'red' },
                            ]}>
                            Cancel
                </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text>Name | Prefer</Text>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.inputRefs.favSport5.togglePicker(true);
                    }}
                    hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <View testID="needed_for_touchable">
                        <Text style={defaultStyles.done}>Done</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        const placeholder = {
            label: 'Select a sport...',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}>
                    <Text>Standard TextInput</Text>
                    <TextInput
                        ref={el => {
                            this.inputRefs.firstTextInput = el;
                        }}
                        returnKeyType="next"
                        enablesReturnKeyAutomatically
                        onSubmitEditing={() => {
                            this.inputRefs.favSport0.togglePicker();
                        }}
                        style={
                            Platform.OS === 'ios'
                                ? pickerSelectStyles.inputIOS
                                : pickerSelectStyles.inputAndroid
                        }
                        blurOnSubmit={false}
                    />

                    <View paddingVertical={5} />

                    <Text>useNativeAndroidPickerStyle (default)</Text>
                    {/* and iOS onUpArrow/onDownArrow toggle example */}
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={intervals}
                        onValueChange={value => {
                            this.setState({
                                favSport0: value,
                            });
                        }}
                        onUpArrow={() => {
                            this.inputRefs.firstTextInput.focus();
                        }}
                        onDownArrow={() => {
                            this.inputRefs.favSport1.togglePicker();
                        }}
                        style={pickerSelectStyles}
                        value={this.state.favSport0}
                        ref={el => {
                            this.inputRefs.favSport0 = el;
                        }}
                    />

                    <View paddingVertical={5} />

                    <Text>set useNativeAndroidPickerStyle to false</Text>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={intervals}
                        onValueChange={value => {
                            this.setState({
                                favSport1: value,
                            });
                        }}
                        style={pickerSelectStyles}
                        value={this.state.favSport1}
                        useNativeAndroidPickerStyle={false}
                        ref={el => {
                            this.inputRefs.favSport1 = el;
                        }}
                    />

                    <View paddingVertical={5} />

                    <Text>set placeholder to empty object</Text>
                    {/* and hiding the InputAccessoryView on iOS */}
                    <RNPickerSelect
                        placeholder={{}}
                        items={intervals}
                        onValueChange={value => {
                            this.setState({
                                favSport2: value,
                            });
                        }}
                        InputAccessoryView={() => null}
                        style={pickerSelectStyles}
                        value={this.state.favSport2}
                    />

                    <View paddingVertical={5} />

                    <Text>custom icon using react-native-shapes</Text>
                    {/* and useNativeAndroidPickerStyle={false} with underlineColorAndroid */}
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={intervals}
                        onValueChange={value => {
                            this.setState({
                                favSport3: value,
                            });
                        }}
                        style={{
                            inputAndroid: {
                                backgroundColor: 'transparent',
                            },
                            iconContainer: {
                                top: 5,
                                right: 15,
                            },
                        }}
                        value={this.state.favSport3}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColorAndroid: 'cyan' }}
                        Icon={() => {
                            return <Chevron size={1.5} color="gray" />;
                        }}
                    />

                    <View paddingVertical={5} />

                    <Text>custom icon using react-native-vector-icons</Text>
                    {/* and value defined */}
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={intervals}
                        onValueChange={value => {
                            this.setState({
                                favSport4: value,
                            });
                        }}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={this.state.favSport4}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                        }}
                    />

                    <View paddingVertical={5} />

                    <Text>custom icon using your own css</Text>
                    {/* and placeholder style changes, showing colors on items, useNativeAndroidPickerStyle={false} */}
                    <RNPickerSelect
                        placeholder={{
                            label: 'Select a number or add another...',
                            value: null,
                            color: 'red',
                        }}
                        items={this.state.numbers}
                        onValueChange={value => {
                            this.setState({
                                favNumber: value,
                            });
                        }}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 20,
                                right: 10,
                            },
                            placeholder: {
                                color: 'purple',
                                fontSize: 12,
                                fontWeight: 'bold',
                            },
                        }}
                        value={this.state.favNumber}
                        Icon={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderTopWidth: 10,
                                        borderTopColor: 'gray',
                                        borderRightWidth: 10,
                                        borderRightColor: 'transparent',
                                        borderLeftWidth: 10,
                                        borderLeftColor: 'transparent',
                                        width: 0,
                                        height: 0,
                                    }}
                                />
                            );
                        }}
                    />
                    <Button
                        title="+1 number to the above list"
                        onPress={() => {
                            const { numbers } = this.state;
                            const value = numbers.length + 1;
                            numbers.push({
                                label: `${value}`,
                                value,
                                color: 'dodgerblue',
                            });
                            this.setState({
                                numbers,
                            });
                        }}
                    />

                    <View paddingVertical={5} />

                    <Text>custom InputAccessoryView on iOS</Text>
                    <RNPickerSelect
                        items={intervals}
                        value={this.state.favSport5}
                        onValueChange={value => {
                            this.setState({
                                favSport5: value,
                            });
                        }}
                        onOpen={() => {
                            this.setState({
                                previousFavSport5: this.state.favSport5,
                            });
                        }}
                        InputAccessoryView={this.InputAccessoryView}
                        ref={ref => {
                            this.inputRefs.favSport5 = ref;
                        }}
                    />
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

export default Settings;