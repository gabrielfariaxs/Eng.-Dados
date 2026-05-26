import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import HomeScreen from '../screens/HomeScreen';
import DocumentScreen from '../screens/DocumentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AlertsScreen from '../screens/AlertsScreen';
import BidDetailsScreen from '../screens/BidDetailsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';

// Custom Tab Bar
import CustomTabBar from '../components/CustomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const EditaisStack = createNativeStackNavigator();

function EditaisStackNavigator() {
  return (
    <EditaisStack.Navigator screenOptions={{ headerShown: false }}>
      <EditaisStack.Screen name="EditaisList" component={HomeScreen} />
      <EditaisStack.Screen name="BidDetails" component={BidDetailsScreen} />
    </EditaisStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Editais" component={EditaisStackNavigator} />
      <Tab.Screen name="Documentos" component={DocumentScreen} />
      <Tab.Screen name="Alertas" component={AlertsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
