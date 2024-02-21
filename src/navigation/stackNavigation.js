import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import ChatRoom from '../screens/ChatRoom';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const {isAuthenticated, user} = useSelector(state => state.auth);
  console.log('isAuthenticated', isAuthenticated);
  console.log('user', user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name="ChatRoom"
            component={ChatRoom}
          />
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
