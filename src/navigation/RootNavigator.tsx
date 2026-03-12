import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import { SearchScreen } from '../screens/main';
import { NotificationScreen } from '../screens/main/NotificationScreen';
import { TermsScreen } from '../screens/terms/TermsScreen';
import { PrivacyScreen } from '../screens/terms/PrivacyScreen';
import BusinessUpgradeScreen from '../screens/mypage/BusinessUpgradeScreen';
import ProductViewScreen from '../screens/product/ProductViewScreen';
import ProductUploadScreen from '../screens/product/ProductUploadScreen';
import CategoryListScreen from '../screens/category/CategoryListScreen';
import FAQScreen from '../screens/terms/FAQScreen';
import BuyListScreen from '../screens/mypage/PurchasListScreen';
import OrderDetailScreen from '../screens/mypage/OrderDetailScreen';
import SellListScreen from '../screens/corporation/SellListScreen';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import FavoriteListScreen from '../screens/mypage/FavoriteListScreen';
import ProfileScreen from '../screens/mypage/ProfileScreen';
import ProfileEditScreen from '../screens/mypage/ProfileEditScreen';
import PasswordResetScreen from '../screens/mypage/PasswordResetScreen';
import TradeReviewScreen from '../screens/mypage/TradeReviewScreen';
import MainTabNavigator from './MainTabNavigator';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const isLoggedIn = false;

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Main' : 'Auth'}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessUpgrade"
        component={BusinessUpgradeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductView"
        component={ProductViewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductUpload"
        component={ProductUploadScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PurchaseList"
        component={BuyListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SalesList"
        component={SellListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FavoriteList"
        component={FavoriteListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TradeReview"
        component={TradeReviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
};

export default RootNavigator;
