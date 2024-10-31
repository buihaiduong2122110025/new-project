

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'one',
        title: 'FIRST FURNITURE',
        text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
        image: require('./../../assets/images/chair1.webp'),
    },
    {
        key: 'two',
        title: 'TAKE A BREAK',
        text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
        image: require('./../../assets/images/table1.webp'),
    },
    {
        key: 'three',
        title: 'ENJOY YOUR JOURNEY',
        text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
        image: require('./../../assets/images/lamp1.webp'),
    },
];

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
    const [showHomePage, setShowHomePage] = useState(false);

    const _renderItem = ({ item }: { item: any }) => {
        return (
            <View style={{ flex: 1 }}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const _renderNextButton = () => {
        return (
            <View style={styles.nextButtonContainer}>
                <Text style={styles.nextButtonText}>Next</Text>
            </View>
        );
    };

    const _renderDoneButton = () => {
        return (
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>

                    <Text style={styles.nextButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            activeDotStyle={styles.activeDot}
            renderNextButton={_renderNextButton}
            renderDoneButton={_renderDoneButton}
        //   onDone={handleDone} // Navigate when Done button is pressed
        />
    );
};

const styles = StyleSheet.create({
    image: {
        // resizeMode: 'cover',
        height: 600,
        width: '100%',
    },
    title: {
        paddingTop: 25,
        paddingBottom: 10,
        fontSize: 23,
        fontWeight: 'bold',
        color: '#21465b',
        alignSelf: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#b5b5b5',
        fontSize: 15,
        paddingHorizontal: 30,
    },
    activeDot: {
        backgroundColor: '#21465b',
        width: 30,
    },
    nextButtonContainer: {
        position: 'absolute',

        right: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
