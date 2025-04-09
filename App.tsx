import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UsersProvider } from './app/context/UsersContext';
import ThemeProvider from './app/context/ThemeContext';
import UsersListScreen from './app/screens/UsersListScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <UsersProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="UsersList">
            <Stack.Screen 
              name="UsersList" 
              component={UsersListScreen}
              options={{ title: 'User Management' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;
