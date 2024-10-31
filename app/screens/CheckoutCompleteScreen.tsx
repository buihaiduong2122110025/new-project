import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const CheckoutCompleteScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SUCCESS!</Text>

            {/* Hình ảnh hoặc icon */}
            <View style={styles.imageContainer}>
                {/* Thay thế bằng hình ảnh hoặc icon tuỳ chọn */}
                <Image
                   source={require('../../assets/images/success.jpg')}
                    style={styles.image}
                />
                <Icon name="check-circle" size={50} color="green" style={styles.checkIcon} />
            </View>

            <Text style={styles.message}>
                Your order will be delivered soon.{"\n"}
                Thank you for choosing our app!
            </Text>

            {/* Nút "Track your orders" */}
            <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('MyOrder')}>
                <Text style={styles.trackButtonText}>Track your orders</Text>
            </TouchableOpacity>

            {/* Nút "Back to Home" */}
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home', { screen: 'Feed' })}>
                <Text style={styles.homeButtonText}>BACK TO HOME</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    checkIcon: {
        position: 'absolute',
        bottom: -10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    trackButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        height:60,
        alignItems: 'center',
    },
    trackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    homeButton: {
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CheckoutCompleteScreen;
