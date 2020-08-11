import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';

import { TogglableTimerForm, EditableTimer } from './components';
import { TimerState, TimerInputDTO, newTimer, genRandomId } from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  titleText: {
    fontSize: 20,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  appContainer: {
    flex: 1,
    padding: 10,
  },
});

const TimerApp = (): JSX.Element => {
  const [timers, setTimers] = useState<TimerState[]>([
    {
      elapsed: 0,
      id: genRandomId(0),
      project: 'House chores',
      title: 'Mourn the lown',
      isRunning: false,
    },
    {
      elapsed: 0,
      id: genRandomId(1),
      project: 'School project',
      title: 'Do assignment',
      isRunning: false,
    },
  ]);

  const TIMER_INTERVAL = 1000;
  const timerId = useRef<number>();

  const handleCreate = (timerInput: TimerInputDTO) => {
    setTimers((prev) => [newTimer(timerInput, prev.length), ...prev]);
  };

  const handleDelete = (id: string) => {
    return setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const handleUpdate = (attrs: {
    id: string;
    project: string;
    title: string;
  }) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === attrs.id ? { ...timer, ...attrs } : timer
      )
    );
  };

  const handleToggle = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const handleReset = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) => (timer.id === id ? { ...timer, elapsed: 0 } : timer))
    );
  };

  /**
   * * Increments the elapsed of the timer that is running everytime timer state changes
   */
  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimers((prev) => {
        return prev.map((timer) =>
          timer.isRunning
            ? { ...timer, elapsed: timer.elapsed + TIMER_INTERVAL }
            : timer
        );
      });
    }, TIMER_INTERVAL);

    return () => {
      window.clearInterval(timerId.current);
    };
  }, [timers, TIMER_INTERVAL]);

  return (
    <SafeAreaView style={[styles.safeAreaStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Timer</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.appContainer]}>
            <TogglableTimerForm onSubmit={handleCreate} />
            <FlatList
              data={timers}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => (
                <EditableTimer
                  id={item.id}
                  title={item.title}
                  isRunning={item.isRunning}
                  project={item.project}
                  elapsed={item.elapsed}
                  onDelete={handleDelete}
                  onEdit={handleUpdate}
                  onStart={handleToggle}
                  onStop={handleToggle}
                  onReset={handleReset}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TimerApp;
