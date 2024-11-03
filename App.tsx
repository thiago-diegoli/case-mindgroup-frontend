import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import DashboardPage from './src/pages/DashboardPage';
import AddProductPage from './src/pages/AddProductPage';
import EditProductPage from './src/pages/EditProductPage';
import StockPage from './src/pages/StockPage';
import HistoryPage from './src/pages/HistoryPage';
import { RootStackParamList } from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111115',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Página Inicial' }}
        />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="AddProduct" component={AddProductPage} />
        <Stack.Screen name="Stock" component={StockPage} />
        <Stack.Screen name="History" component={HistoryPage} />
        <Stack.Screen name="EditProductPage" component={EditProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
