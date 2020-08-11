import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as ToggleButton } from './buttons.component';
import { TimerForm } from './timer-form.component';

interface ToggleTimerFormProps {
  onSubmit?: (timerInputDTO: { project: string; title: string }) => void;
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});

export const TogglableTimerForm = ({
  onSubmit,
}: ToggleTimerFormProps): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleFormToggle = (): void => setOpen((prev) => !prev);

  return (
    <View style={styles.container}>
      {!isOpen ? (
        <ToggleButton onPress={handleFormToggle} />
      ) : (
        <TimerForm onSubmit={onSubmit} onCancel={handleFormToggle} />
      )}
    </View>
  );
};

TogglableTimerForm.defaultProps = {
  onSubmit: () => {},
};
