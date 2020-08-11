import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerApp from './src/timer-app';

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <TimerApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
