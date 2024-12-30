import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import SplashScreen from '../Screens/splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
const Stack = createNativeStackNavigator();


const AuthNavigation = () => {

    return (
        <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen}/>
          <Stack.Screen name="LoginScreen"options={{ headerShown: false }}component={LoginScreen} />
          <Stack.Screen name="Home"options={{ title: 'User Lists',headerTitleAlign:'center' }} component={Home} />
        </Stack.Navigator>
        </NavigationContainer>
      );
  };
  
  export default AuthNavigation;