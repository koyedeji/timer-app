import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

interface ButtonProps {
  title?: string;
  color?: string;
  onPress: () => void;
}

export const Button = ({ title, color, onPress }: ButtonProps) => {
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

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 120,
  },
  textStyle: {
    fontSize: 20,
  },
});
