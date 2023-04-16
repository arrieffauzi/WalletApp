import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {UserContext} from '../../../App';
import Gap from '../../components/Gap';

const Login = ({navigation}: any) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [userLogin, setUserLogin] = useState({});
  const [isSecure, setIsSecure] = useState(true);
  const {email, password}: any = userLogin;
  const user: any = useContext(UserContext);

  const handleCheckEmail = (value: string) => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.toLowerCase().match(regex)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleOnchangeText = (value: string, fieldName: string) => {
    if (fieldName == 'email') {
      handleCheckEmail(value);
    }
    setUserLogin({...userLogin, [fieldName]: value});
  };

  const handleViewPassword = () => {
    if (isSecure) {
      setIsSecure(false);
    } else {
      setIsSecure(true);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const onSubmit = () => {
    axios
      .post('https://tht-api.nutech-integrasi.app/login', userLogin, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        if (response.data.status == 0) {
          user.setUser(response.data.data);
          navigation.navigate('Dashboard');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.background}>
      <View style={styles.page}>
        <View style={styles.logoContainer}>
          <Text style={styles.nutech}>Nutech</Text>
          <Text style={styles.wallet}>Wallet</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.wrapperInput}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(value: string) =>
                handleOnchangeText(value, 'email')
              }
            />
          </View>
          {!isValidEmail && (
            <Text style={styles.errorMsg}>Email is invalid</Text>
          )}
          <Gap/>
          <View style={styles.wrapperInput}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={isSecure}
              onChangeText={(value: string) =>
                handleOnchangeText(value, 'password')
              }
            />
            <Icon
              name={isSecure ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              onPress={handleViewPassword}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              textButton="Login"
              disabled={!isValidEmail}
              onPress={onSubmit}
            />
          </View>
          <View style={styles.registerContainer}>
            <Text>
              Don't have an account yet?{' '}
              <Text style={styles.register} onPress={goToRegister}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
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
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  nutech: {
    fontSize: 30,
    color: '#f57921',
    fontWeight: '900',
  },
  wallet: {
    fontSize: 30,
    color: '#4c4d4f',
    fontWeight: '900',
  },
  inputContainer: {
    flex: 1,
    marginTop: 50,
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderStyle: 'solid',
    flex: 1,
  },
  forgot: {
    color: '#f57921',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  registerContainer: {
    marginTop: 16,
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  register: {
    color: '#f57921',
  },
  errorMsg: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#DB0000',
    marginTop: 5,
    marginLeft: 5,
  },
});
