import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/Home';
import LoginScreen from './src/Login';
import UserScreen from './src/User';
import RolesScreen from './src/Roles';
import RoleScreen from './src/Role';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Roles" component={RolesScreen} />
      <Stack.Screen name="Role" component={RoleScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
