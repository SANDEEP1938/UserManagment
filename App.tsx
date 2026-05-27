import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UsersProvider } from './app/context/UsersContext';
import ThemeProvider from './app/context/ThemeContext';
import UsersListScreen from './app/screens/UsersListScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UsersProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="UsersList">
              <Stack.Screen
                name="UsersList"
                component={UsersListScreen}
                options={{ 
                  title: 'Users List',
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UsersProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
