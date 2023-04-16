import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

type prop = {
  textButton: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({textButton, onPress, disabled}: prop) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={disabled ? styles.backgroundInvalid : styles.background}
        disabled={disabled}>
        <Text style={styles.text}>{textButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f57921',
    borderRadius: 20,
  },
  backgroundInvalid: {
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    alignSelf: 'center',
  },
});
