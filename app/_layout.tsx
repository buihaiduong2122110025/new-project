import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import IntroScreen from './screens/SplashScreen';
import { useFonts } from 'expo-font';
import Register from './screens/RegisterScreen';
import CartScreen from './screens/tab/CartScreen';
// import CategoryAllScreen from './screens/CategoryAllScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import HomeScreens from './screens/tab/HomeScreen';
import NotificationScreen from './screens/tab/NocafitionScreen';
import FavoritesScreen from './screens/tab/FavoritesScreen';
import _TabLayout from './screens/_TabLayout';
import CheckoutScreen from './screens/CheckoutScreen';
import CheckoutCompleteScreen from './screens/CheckoutCompleteScreen';
import ProductAllScreen from './screens/ProductAllScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { LogBox } from 'react-native';
import OrderDetailScreen from './screens/OrderDetailScreen';
import ChangePassword from './screens/ChangePasswordScreen';
import LoginWithOTPScreen from './screens/LoginWithOTPScreen';
import ProfileDetail from './screens/ProfileDetail';
const Stack = createNativeStackNavigator();

const _layout = () => {

    // useFonts({
    //     'outfit': require('./../assets/fonts/NunitoSans-ExtraBold.ttf'),
    //     'outfit': require('./../assets/fonts/NunitoSans-ExtraBold.ttf')

    // })
    useFonts({
        'outfit-bold': require('./../assets/fonts/NunitoSans-ExtraBold.ttf'),
        'outfit-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
        'outfit-semibold': require('./../assets/fonts/Poppins-SemiBold.ttf'),
        'outfit-Poppins-Bold': require('./../assets/fonts/Poppins-Bold.ttf')

    });
        LogBox.ignoreLogs(['fontFamily "outfit-regular" is not a system font']);

    if (!process.env.EXPO_ROUTER_APP_ROOT) {
        process.env.EXPO_ROUTER_APP_ROOT = 'app'; // Thay 'app' bằng thư mục của bạn nếu khác
      }
    
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Otp" component={LoginWithOTPScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={_TabLayout} options={{ headerShown: false }} />
                <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Complete" component={CheckoutCompleteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyCart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyOrder" component={MyOrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductAll" component={ProductAllScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="CategoryAll" component={CategoryAllScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Detail" component={ProductDetailScreen} options={{ headerShown: false }} />       
                <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Start" component={OnboardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
             


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default _layout

const styles = StyleSheet.create({})