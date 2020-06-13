import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

export default createAppContainer(navigator);
