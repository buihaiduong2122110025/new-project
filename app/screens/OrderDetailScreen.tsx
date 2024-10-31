import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const OrderDetailScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { orderData } = route.params; // Dữ liệu đơn hàng được truyền từ màn hình trước

    const renderItem = ({ item }:{item:any}) => {
        return (
            <View style={styles.productItem}>
                <View style={styles.orderItem}>
                    
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.price}</Text>
                        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                    </View>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>My Order</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order ID:</Text>
                <Text style={styles.orderId}>{orderData.orderId}</Text>
                <Text style={styles.orderId}>{orderData.timestamp}</Text>

            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shipping Address:</Text>
                <Text style={{ marginBottom:2 }}>User: {orderData.userEmail}</Text>

                <Text style={styles.address}>{orderData.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method:</Text>
                <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery Method:</Text>
                <Text style={styles.paymentMethod}>{orderData.deliveryMethod}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary:</Text>
                <FlatList
                    data={orderData.items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Text style={styles.totalAmount}>Total Amount: ${orderData.totalAmount.toFixed(2)}</Text>
            </View>

      
        </View>
    );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    itemInfo: {
        // flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 12,
        color: '#E29547',
    },
    itemQuantity: {
        fontSize: 12,
        color: '#666',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    productQuantity: {},
    address: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    paymentMethod: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#E29547',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    backButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        width: 225,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        // marginTop: 30,
    },
});
