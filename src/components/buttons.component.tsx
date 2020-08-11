import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title?: string;
  color?: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  textStyle: {
    fontSize: 20,
  },
});

export const Button = ({ title, color, onPress }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        borderColor: color,
      }}
      onPress={onPress}
    >
      <Text style={{ ...styles.textStyle, color: color }}>{title}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  color: '#d3d3d3',
  title: '+',
};
