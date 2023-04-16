import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

type props = {
  palceholder: string;
  fieldName: any;
  style?: any;
  onChange: (value: string, fieldName: string) => void;
  isValid: boolean;
  keyboard?: string;
};

const FormInput = ({
  palceholder,
  fieldName,
  isValid,
  keyboard,
}: props) => {
  
  return (
    <View style={styles.wrapperInput}>
      <TextInput
        placeholder={palceholder}
        style={styles.input}
        keyboardType={
          keyboard == 'email'
            ? 'email-address'
            : keyboard == 'number'
            ? 'numeric'
            : 'default'
        }
      />
      {!isValid && <Text style={styles.errorMsg}>Email is invalid</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  wrapperInput: {
    marginBottom: 20,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  errorMsg: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#DB0000',
    marginTop: 5,
    marginLeft: 5,
  },
});
