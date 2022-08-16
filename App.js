import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigation/mainStack';
import { ContextProvider } from './contextState';

export default function App() {
  return (
    <ContextProvider>
      <MainStack/>
    </ContextProvider>
  );
}
