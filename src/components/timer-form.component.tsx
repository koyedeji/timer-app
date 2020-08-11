import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Button } from './buttons.component';

interface TimerFormProps {
  project?: string;
  title?: string;
  id?: string;
  onCancel: () => void;
  onSubmit: (inputDTO: TimerState) => void;
}

type TimerState = {
  title: string;
  project: string;
  id?: string;
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
  },
  labelText: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 45,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export const TimerForm = ({
  onSubmit,
  onCancel,
  ...props
}: TimerFormProps): JSX.Element => {
  const [formValues, setValue] = useState<TimerState>({
    title: props.title || '',
    project: props.project || '',
  });

  const handleInputChange = (text: string, key: string) =>
    setValue((prevState) => ({
      ...prevState,
      [key]: text,
    }));

  const handleCancel = () => {
    onCancel();
    setValue({ title: '', project: '' });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    handleCancel();
  };

  const { project, title } = formValues;

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputWrapper]}>
        <Text style={[styles.labelText]}>Title</Text>
        <TextInput
          style={[styles.input]}
          value={title}
          onChangeText={(text) => handleInputChange(text, 'title')}
          placeholder='Enter a project name'
        />
      </View>

      <View style={[styles.inputWrapper]}>
        <Text style={[styles.labelText]}>Project</Text>
        <TextInput
          style={[styles.input]}
          placeholder='Enter a title'
          value={project}
          onChangeText={(text) => handleInputChange(text, 'project')}
        />
      </View>

      <View style={[styles.btnContainer]}>
        <Button
          color='green'
          title={props.id ? 'Update' : 'Create'}
          onPress={handleSubmit}
        />
        <Button color='red' title='Cancel' onPress={handleCancel} />
      </View>
    </View>
  );
};

TimerForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
};
