import React, { useState, useEffect } from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '@/firebaseConfig';


import PayPal from 'react-native-paypal';
import { Ionicons } from '@expo/vector-icons';

const db = getFirestore(app);
const auth = getAuth(app);

const CheckoutScreen = ({ navigation, route }: { navigation: any; route: any; }) => {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const { cartList, totalAmount } = route.params;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [finalTotalAmount, setFinalTotalAmount] = useState(totalAmount);




    


    const auth = getAuth();

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };
    const handleDeliveryMethodSelect = (method: string) => {
        setSelectedDeliveryMethod(method);
        // Calculate the shipping fee based on the selected delivery method
        const deliveryFee = method === 'Fast (2-3 days)' ? 50 : 30;
        setFinalTotalAmount(totalAmount + deliveryFee);  // Update the final total amount
    };

    const clearCart = async () => {
        // Xóa tất cả sản phẩm trong giỏ hàng
        try {
            const querySnapshot = await getDocs(collection(db, 'cart'));
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        } catch (error) {
            console.error("Error clearing cart: ", error);
        }
    };

    const handleCheckout = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to proceed with payment.");
            return;
        }

        const orderId = `${user.uid}_${new Date().getTime()}`;

        const now = new Date();
        const vietnamTime = now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
        console.log(vietnamTime);
        const orderData = {
            userEmail: user.email,
            items: cartList,
            totalAmount: finalTotalAmount,  // Use the final total amount including the delivery fee
            paymentMethod: selectedPaymentMethod,
            address: '103 Tăng Nhơn Phú, Phước Long B, Quận 9, Thành phố Hồ Chí Minh',
            status: '0',

            deliveryMethod: selectedDeliveryMethod,
            timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), // Lấy giờ Việt Nam
        };

        try {
            console.log("Order Data:", orderData); // Log the order data
            // Save the order to Firestore
            await setDoc(doc(collection(db, 'orders'), orderId), orderData);
            // Clear the cart
            await clearCart();
            // alert("Order placed successfully!");
            navigation.navigate('Complete');
        } catch (error) {
            console.error("Error placing order: ", error);
        }
    };


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email); // Set the user's email if authenticated
            } else {
                setUserEmail(null); // If user is signed out, set email to null
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);



    
    return (
        <View style={styles.container}>

              {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay lại trang trước
      >
        <Ionicons name="arrow-back" size={29} color="black" />
      </TouchableOpacity>
            <Text style={styles.title}>Check out</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <View style={styles.addressBox}>
                    <Text style={styles.namePlaceholder}>Name: {userEmail ? userEmail : 'No email found'}</Text>
                    <Text style={styles.addressPlaceholder}>
                        103 Tăng Nhơn Phú, Phước Long B, Quận 9, Thành phố Hồ Chí Minh
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment</Text>
                <View style={styles.paymentOptions}>
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedPaymentMethod === 'Cash Payment' && styles.selectedOption]}
                        onPress={() => handlePaymentMethodSelect('Cash Payment')}
                    >
                        <Text style={styles.paymentText}>Cash Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentOption, selectedPaymentMethod === 'Bank Payment' && styles.selectedOption]}
                        onPress={() => handlePaymentMethodSelect('Bank Payment')}
                    >
                        <Text style={styles.paymentText}>Bank Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Delivery Method Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery method</Text>
                <View style={styles.deliveryOptions}>
                    <TouchableOpacity
                        style={[styles.deliveryOption, selectedDeliveryMethod === 'Fast (2-3 days)' && styles.selectedOption]}
                        onPress={() => handleDeliveryMethodSelect('Fast (2-3 days)')}
                    >
                        <Text style={styles.deliveryText}>Fast (2-3 days) $50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deliveryOption, selectedDeliveryMethod === 'Slow (4-5 days)' && styles.selectedOption]}
                        onPress={() => handleDeliveryMethodSelect('Slow (4-5 days)')}
                    >
                        <Text style={styles.deliveryText}>Slow (4-5 days) $30</Text>
                    </TouchableOpacity>
                </View>
            </View>
          

            <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <Text style={styles.totalAmount}>Total Amount: ${finalTotalAmount.toFixed(2)}</Text>
                <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Confirm Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    deliveryOptions: {
        flexDirection: 'column',
    },
    deliveryOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    // selectedOption: {
    //     backgroundColor: '#E0E0E0', // Màu sắc cho tùy chọn đã chọn
    // },
    // deliveryText: {
    //     fontSize: 16,
    //     fontWeight: '600',
    //     flex: 1,
    // },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E29547',
        marginVertical: 10,
    },
    checkoutButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 10,
        fontFamily: 'outfit-regular',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentOptions: {
        flexDirection: 'column',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1, // Đảm bảo icon nằm trên các thành phần khác
      },
    paymentOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedOption: {
        backgroundColor: '#E0E0E0', // Change this color for selected option
    },
    paymentText: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    icon: {
        width: 20,
        height: 20,
    },
    addressBox: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    namePlaceholder: {
        fontSize: 16,
        fontWeight: '600',
    },
    addressPlaceholder: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        fontFamily: 'outfit-regular',
        fontWeight: '300',
    },
    deliveryBox: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryIcon: {
        width: 100,
        height: 25,
        marginRight: 10,
    },
    deliveryText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'outfit-regular',
    },
    summaryBox: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    rowBetweentext: {
        fontFamily: 'outfit-regular',
        fontWeight: '300',
    },
    rowBetweentext1: {
        fontFamily: 'outfit-semibold',
        fontWeight: '300',
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
    },
    submitButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});

