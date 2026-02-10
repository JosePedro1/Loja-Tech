import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";

import { initDB } from './src/database/database';
import { syncData } from './src/services/syncService';

import HomeScreen from './src/screens/HomeScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import HistoricoRemotoScreen from './src/screens/HistoricoRemotoScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#000',
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopWidth: 0
        },

        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#999',

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Catálogo') iconName = 'home';
          if (route.name === 'Carrinho') iconName = 'cart';
          if (route.name === 'Histórico') iconName = 'time';

          return <Ionicons name={iconName} size={22} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Catálogo" component={HomeScreen} />
      <Tab.Screen name="Carrinho" component={CarrinhoScreen} />
      <Tab.Screen name="Histórico" component={HistoricoRemotoScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  useEffect(() => {
    const start = async () => {
      await initDB();
      await syncData();
    };

    start();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
