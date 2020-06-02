import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { Text, Title, Paragraph, Button } from 'react-native-paper';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/images/icewater.jpg')} style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Hydro Homie</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => console.log('get hydrated')}
                style={styles.button}
                icon="cup-water"
                mode="contained">
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Hydrate Me</Text>
            </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
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
    paddingVertical: 50,
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
    
  },
  button: {
    backgroundColor: '#61dafb',
    paddingVertical: 6,
    width: '90%',
    alignSelf: 'center',
  }
});
