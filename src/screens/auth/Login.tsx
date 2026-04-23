import React, { useState, useEffect } from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { LOGIN_REQUEST } from '../../app/reducers/authReducer';
import { AppState } from '../../types';

const Login: React.FC = () => {
  const [emailAdd, setEmailAdd] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get loading, error, and auth state from Redux
  const { isLoading, error, isAuthenticated } = useSelector((state: AppState) => state.auth);

  // Log when Login screen loads
  console.log('[SCREEN] Login screen loaded');

  // Show error alert when error changes
  useEffect(() => {
    if (error) {
      console.log(`[ERROR] Login failed: ${error}`);
      Alert.alert('Login Failed', error);
    }
  }, [error]);

  // Navigate to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('[SUCCESS] User authenticated successfully, redirecting');
      // RootNav will handle switching to MainNav with Dashboard
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = (): void => {
    // Log button press with final values
    console.log('[ACTION] Login button pressed');
    console.log(`[DATA] Email: ${emailAdd}, Password entered: ${password ? 'Yes' : 'No'}`);

    if (emailAdd === '' || password === '') {
      console.log('[VALIDATION] Empty fields detected');
      Alert.alert(
        'Invalid Credentials',
        'Please enter valid email address and password',
      );
      return;
    }

    console.log('[VALIDATION] All fields filled, dispatching LOGIN_REQUEST');

    // Dispatch login action
    dispatch({
      type: LOGIN_REQUEST,
      payload: { email: emailAdd, password }
    });
  };

  const handleRegisterPress = (): void => {
    console.log('[ACTION] Register link pressed');
    navigation.navigate(ROUTES.REGISTER as never);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/4NJl8sD.jpg' }}
      style={styles.background as StyleProp<ImageStyle>}
    >
      <View style={styles.overlay as StyleProp<ViewStyle>} />
      <View style={styles.formWrapper as StyleProp<ViewStyle>}>
        <Text style={styles.title as StyleProp<TextStyle>}>Welcome back</Text>
        <Text style={styles.subtitle as StyleProp<TextStyle>}>Enter your details to access your account</Text>

        <CustomTextInput
          label={'Email Address'}
          placeholder={'Enter Email Address'}
          value={emailAdd}
          onChangeText={setEmailAdd}
          containerStyle={styles.inputContainer as StyleProp<ViewStyle>}
          textStyle={styles.inputText as StyleProp<TextStyle>}
        />
        <CustomTextInput
          label={'Password'}
          placeholder={'Enter Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          containerStyle={styles.inputContainer as StyleProp<ViewStyle>}
          textStyle={styles.inputText as StyleProp<TextStyle>}
        />

        <CustomButton
          label={isLoading ? "LOGGING IN..." : "Sign In"}
          containerStyle={[styles.button as StyleProp<ViewStyle>, isLoading && { backgroundColor: 'gray' }]}
          textStyle={styles.buttonText as StyleProp<TextStyle>}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator color="white" />}
        </CustomButton>

        <View style={styles.footerLinks as StyleProp<ViewStyle>}>
          <Text style={styles.footerText as StyleProp<TextStyle>}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.linkText as StyleProp<TextStyle>}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  inputText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    marginRight: 5,
  },
  linkText: {
    color: '#ffcc00',
    textDecorationLine: 'underline',
  },
};

export default Login;
