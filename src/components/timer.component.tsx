import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './buttons.component';

interface TimerProps {
  elapsed: number;
  isRunning: boolean;
  title: string;
  id: string;
  project: string;
  onDelete: (timerId: string) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onReset: (id: string) => void;
  onOpenEditForm: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    minHeight: 200,

    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'flex-start',
  },
  timerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export const Timer = ({
  id,
  elapsed,
  title,
  isRunning,
  project,
  onDelete,
  onStart,
  onStop,
  onReset,
  onOpenEditForm,
}: TimerProps): JSX.Element => {
  const handleOpen = () => onOpenEditForm();

  const handleStop = () => onStop(id);

  const handleDelete = () => onDelete(id);

  const handleStart = () => onStart(id);

  const handleReset = () => onReset(id);

  return (
    <View style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.textSmall, styles.textBold]}>{project}</Text>
        <Text style={[styles.textSmall]}>{title}</Text>
      </View>

      <View style={[styles.timerContainer]}>
        <Text style={[styles.textBold, styles.textLarge]}>{elapsed}</Text>
      </View>

      <View style={[styles.btnContainer]}>
        <View style={[styles.rowContainer]}>
          <Button title='Edit' onPress={handleOpen} color='blue' />
          <Button title='Reset' onPress={handleReset} color='#d3d3d3' />
          <Button title='Delete' onPress={handleDelete} color='red' />
        </View>
        {isRunning ? (
          <Button title='stop' onPress={handleStop} color='red' />
        ) : (
          <Button title='Start' onPress={handleStart} color='green' />
        )}
      </View>
    </View>
  );
};
