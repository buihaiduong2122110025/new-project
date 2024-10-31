import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

// Bỏ qua cảnh báo về font
LogBox.ignoreLogs(['fontFamily "outfit" is not a system font']);
const IntroScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Start');
    }, 5000); // Hiện intro trong 3 giây

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.image}  source={require('../../assets/images/chair.gif')}/>
      <Text style={{ fontSize:30, color:'#FFFFF', fontFamily:'outfit-regular' , textAlign:'center' }}>Welcome  !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5da",
  },
  imageContainer: {
    // borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width:400,
    height:400,
    resizeMode: "cover",
    borderRadius: 20,
  },

});

export default IntroScreen;