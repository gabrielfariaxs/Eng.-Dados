import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, FileText, LayoutDashboard, Bell } from 'lucide-react-native';

// Telas (serão criadas nos próximos passos)
import HomeScreen from '../screens/HomeScreen';
import DocumentScreen from '../screens/DocumentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AlertsScreen from '../screens/AlertsScreen';
import BidDetailsScreen from '../screens/BidDetailsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: { backgroundColor: '#f8fafc' },
        headerTitleStyle: { fontWeight: 'bold', color: '#1e293b' },
      }}
    >
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Documentos" 
        component={DocumentScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Alertas" 
        component={AlertsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BidDetails" 
          component={BidDetailsScreen} 
          options={{ title: 'Detalhes do Edital' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
