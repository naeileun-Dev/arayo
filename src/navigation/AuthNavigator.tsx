/**
 * 인증 네비게이터
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  SignUpScreen,
  SignUpCompleteScreen,
  AccountRestrictedScreen,
  AccountRecoveryScreen,
} from '../screens/auth';
import type { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpCompleteScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="AccountRestricted" component={AccountRestrictedScreen} />
      <Stack.Screen name="AccountRecovery" component={AccountRecoveryScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
