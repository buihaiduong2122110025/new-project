import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

export default function FavoritesScreen({navigation}:{navigation:any}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="search" size={24} color="#000" />
                <Text style={styles.title}>Favorites</Text>
                <Icon name="refresh" size={24} color="#000" />
            </View>
            <ScrollView>
                {/* Hiển thị cố định 5 items */}
                <View style={styles.itemContainer}>
                    <Image source={require('../../../assets/images/chair1.webp')} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>Product Name</Text>
                        <Text style={styles.itemPrice}>$200</Text>
                    </View>
                    <View style={{ display:'flex', justifyContent:'center',alignItems:'center' }}>
                        <TouchableOpacity style={styles.cartButton}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/icon/icondel.png')} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeButton}>
                        <Image style={{ width: 34, height: 34 }} source={require('../../../assets/images/icon/iconaddcart.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <Image source={require('../../../assets/images/chair1.webp')} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>Product Name</Text>
                        <Text style={styles.itemPrice}>$200</Text>
                    </View>
                    <View style={{ display:'flex', justifyContent:'center',alignItems:'center' }}>
                        <TouchableOpacity style={styles.cartButton}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/icon/icondel.png')} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeButton}>
                        <Image style={{ width: 34, height: 34 }} source={require('../../../assets/images/icon/iconaddcart.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <Image source={require('../../../assets/images/chair1.webp')} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>Product Name</Text>
                        <Text style={styles.itemPrice}>$200</Text>
                    </View>
                    <View style={{ display:'flex', justifyContent:'center',alignItems:'center' }}>
                        <TouchableOpacity style={styles.cartButton}>

                            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/images/icon/icondel.png')} />

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeButton}>
                        <Image style={{ width: 34, height: 34 }} source={require('../../../assets/images/icon/iconaddcart.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tiếp tục hiển thị các sản phẩm */}
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Cart' })} style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add all to my cart</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#e0e0e0', 
    
    },
    itemDetails: {
        width:100,
        height:100,
        flex: 1,
        justifyContent: 'flex-start', // Căn lên trên cùng theo trục dọc
        alignItems: 'flex-start', // Căn lên trên cùng theo trục ngang (trái)
    
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ccc', // màu xám cho placeholder
        fontFamily:'outfit-regular'

    },
    itemPrice: {
        fontSize: 14,

        color: 'black', // placeholder giá
        fontFamily:'outfit-semibold',
        // fontWeight:'bold'
    },
    cartButton: {
        padding: 10,
        // backgroundColor: '#e0e0e0',
        borderRadius: 20,
        // marginRight: 10,
    },
    cartButtonText: {
        fontSize: 16,
    },
    removeButton: {
        padding: 10,
    },
    removeButtonText: {
        fontSize: 18,
        color: 'red',
    },
    addToCartButton: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
