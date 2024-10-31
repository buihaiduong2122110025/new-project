import { Link, Tabs } from 'expo-router';
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreens from './tab/HomeScreen';
import NocafitionScreen from './tab/NocafitionScreen';
import CartScreen from './tab/CartScreen';
import { useFonts } from 'expo-font';
import FavoritesScreen from './tab/FavoritesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './tab/ProfileScreen';
import FeedScreen from './tab/HomeScreen';


const Tab = createBottomTabNavigator();

const _TabLayout = ({ navigation }: { navigation: any }) => {
  useFonts({
    'outfit': require('./../../assets/fonts/NunitoSans-ExtraBold.ttf')
  })
  return (
 
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#E29547",
          headerShown: false,

        }}
      >

        <Tab.Screen name="Feed" component={FeedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              < Image
                source={
                  focused
                    ? require('./../../assets/images/icon/iconhomeactive.png')
                    : require('./../../assets/images/icon/iconhome.png')
                }
                style={{ width: 24, height: 24 }}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Image
                  source={require('./../../assets/images/icon/iconeclipactive.png')}
                  style={{ width: 7, height: 7, marginBottom: 10 }}
                />
              ) : null, // Không hiển thị gì khi không được chọn
          }}

        />
        <Tab.Screen name="Nocafition" component={NocafitionScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/icon/iconmesactive.png')
                    : require('./../../assets/images/icon/iconmes.png')
                }
                style={{ width: 24, height: 24 }}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Image
                  source={require('./../../assets/images/icon/iconeclipactive.png')}
                  style={{ width: 7, height: 7, marginBottom: 10 }}
                />
              ) : null, // Không hiển thị gì khi không được chọn
          }}

        />
        <Tab.Screen name="Cart" component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/icon/iconcartactive.png')
                    : require('./../../assets/images/icon/iconcart.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Image
                  source={require('./../../assets/images/icon/iconeclipactive.png')}
                  style={{ width: 7, height: 7, marginBottom: 10 }}
                />
              ) : null, // Không hiển thị gì khi không được chọn
          }}


        />

        <Tab.Screen name="Favorites" component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/icon/iconheartactive.png')
                    : require('./../../assets/images/icon/iconheart.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Image
                  source={require('./../../assets/images/icon/iconeclipactive.png')}
                  style={{ width: 7, height: 7, marginBottom: 10 }}
                />
              ) : null, // Không hiển thị gì khi không được chọn
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./../../assets/images/icon/iconuseractive.png')
                    : require('./../../assets/images/icon/iconuser.png')
                }
                style={{ width: 27, height: 27 }}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Image
                  source={require('./../../assets/images/icon/iconeclipactive.png')}
                  style={{ width: 7, height: 7, marginBottom: 10 }}
                />
              ) : null, // Không hiển thị gì khi không được chọn
          }}

        />




      </Tab.Navigator>
  );
}


export default _TabLayout;


