import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import TitleHeader from '../../components/TitleHeader';
import Button from '../../components/Button';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [userData, setUserData] = useState({});
  const {email, password}: any = userData;
  const navigation = useNavigation();

  const handleCheckEmail = (email: string) => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.toLowerCase().match(regex)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleCheckPassword = (pass: string) => {
    let regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (pass.match(regex)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleOnchangeText = (value: string, fieldName: string) => {
    if (fieldName == 'email') {
      handleCheckEmail(value);
    } else if (fieldName == 'password') {
      handleCheckPassword(value);
    }
    setUserData({...userData, [fieldName]: value});
  };

  const onSubmit = () => {
    axios
      .post('https://tht-api.nutech-integrasi.app/registration', userData)
      .then(function (response) {
        if(response.data.status == 0){
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <View style={styles.page}>
            <TitleHeader title="Register" backButton={true} />
            <View style={styles.inner}>
              <ScrollView>
                <View style={styles.formContainer}>
                  <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="First Name"
                      style={styles.input}
                      onChangeText={(value: string) =>
                        handleOnchangeText(value, 'first_name')
                      }
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="Last Name"
                      style={styles.input}
                      onChangeText={(value: string) =>
                        handleOnchangeText(value, 'last_name')
                      }
                    />
                  </View>
                  <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      keyboardType="email-address"
                      onChangeText={(value: string) =>
                        handleOnchangeText(value, 'email')
                      }
                    />
                    {!isValidEmail && (
                      <Text style={styles.errorMsg}>Email is invalid</Text>
                    )}
                  </View>
                  <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry={true}
                      onChangeText={(value: string) =>
                        handleOnchangeText(value, 'password')
                      }
                    />
                    {!isValidPassword && (
                      <Text style={styles.errorMsg}>
                        password should contain atleast one number, one special
                        character, one uppercase and one lowercase
                      </Text>
                    )}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.btnContainer}>
                <Button textButton="Register" onPress={onSubmit} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: '#f57921',
    flex: 1,
  },
  page: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '20%',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'space-around',
  },
  formContainer: {
    marginTop: 30,
    flex: 1,
  },
  wrapperInput: {
    marginBottom: 36,
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

  inner: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 20,
  },
});
