import React from 'react';
import { createStore } from 'redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import reducers from './redux/reducers';
import HomeScreen from './components/HomeScreen';
import Settings from './components/Settings';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: Settings,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: "Hydro Homie"
    }
  }
);

const AppContainer = createAppContainer(navigator);

class App extends React.Component {
  render() {
    return (
      <StoreProvider store={createStore(reducers)}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    );
  }
}

export default App;