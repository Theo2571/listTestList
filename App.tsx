import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { WsProvider } from './src/providers/WsProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <WsProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </WsProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
