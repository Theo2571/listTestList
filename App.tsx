import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { FeedScreen } from './src/screens/FeedScreen/FeedScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <StatusBar style="dark" />
        <FeedScreen />
      </QueryProvider>
    </SafeAreaProvider>
  );
}
