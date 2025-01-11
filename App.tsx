import React from 'react';
import { HomeScreen, SimulationScreen, ImageProcessScreen } from './src/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='simulation' component={SimulationScreen} />
      <Stack.Screen name='image-process' component={ImageProcessScreen} />
    </Stack.Navigator>
  );
}

export default App