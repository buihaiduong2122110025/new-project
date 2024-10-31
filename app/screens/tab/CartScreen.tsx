
// import { Ionicons } from '@expo/vector-icons';
// import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { app } from '@/firebaseConfig';
// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const db = getFirestore(app);
// const auth = getAuth(app);

// type CartItem = {
//     id: string;
//     name: string;
//     image: string;
//     price: string;
//     quantity: number;
// };

// const CartScreen = ({ navigation }: { navigation: any }) => {
//     const [cartList, setCartList] = useState<CartItem[]>([]);
//     const [totalAmount, setTotalAmount] = useState<number>(0);

//     const getCartList = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, 'cart'));
//             const carts: CartItem[] = [];
//             querySnapshot.forEach((doc) => {
//                 carts.push({ id: doc.id, ...doc.data() } as CartItem);
//             });
//             setCartList(carts);
//             calculateTotal(carts);
//         } catch (error) {
//             console.error("Error fetching cart list: ", error);
//         }
//     };

//     const calculateTotal = (carts: CartItem[]) => {
//         const total = carts.reduce((acc: number, cart: CartItem) => {
//             return acc + (cart.price ? parseFloat(cart.price) * cart.quantity : 0);
//         }, 0);
//         setTotalAmount(total);
//     };

//     const deleteCartItem = async (id: string) => {
//         try {
//             await deleteDoc(doc(db, 'cart', id));
//             const updatedCartList = cartList.filter(cart => cart.id !== id);
//             setCartList(updatedCartList);
//             calculateTotal(updatedCartList);
//         } catch (error) {
//             console.error("Error deleting cart item: ", error);
//         }
//     };

//     const clearCart = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, 'cart'));
//             const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
//             await Promise.all(deletePromises);
//             setCartList([]); // Đặt danh sách giỏ hàng rỗng
//             setTotalAmount(0); // Đặt tổng tiền rỗng
//         } catch (error) {
//             console.error("Error clearing cart: ", error);
//         }
//     };

//     const handleRefresh = () => {
//         getCartList();
//     };

//     useEffect(() => {
//         getCartList();

//         const unsubscribe = navigation.addListener('focus', () => {
//             getCartList(); // Gọi lại hàm để làm mới danh sách khi trang được hiện lên
//         });

//         return unsubscribe; // Dọn dẹp listener khi component unmount
//     }, [navigation]);

//     const renderCartItem = ({ item }: { item: CartItem }) => (
//         <View key={item.id} style={styles.cartItem}>
//             <View style={styles.cartImagePlaceholder}>
//                 <Image source={{ uri: item.image }} style={styles.popularImage} />
//             </View>
//             <View style={styles.cartItemInfo}>
//                 <Text style={styles.itemName}>{item.name ? item.name : 'Unknown item'}</Text>
//                 <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
//                 <View style={styles.qtyContainer}>
//                     <Text style={styles.quantityText}>{item.quantity}</Text>
//                 </View>
//             </View>
//             <View>
//                 <TouchableOpacity style={styles.del} onPress={() => deleteCartItem(item.id)}>
//                     <Icon name="close" size={20} color="#E29547" />
//                 </TouchableOpacity>
//                 <Text style={styles.itemPrice}>${item.price ? item.price : 'Price unknown'}</Text>
//             </View>
//         </View>
//     );

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from '@/firebaseConfig';

const db = getFirestore(app);

type CartItem = {
    id: string;
    name: string;
    image: string;
        price: string;
        quantity: number;
    };


    const CartScreen = ({ navigation }: { navigation: any }) => {
        const [cartList, setCartList] = useState<CartItem[]>([]);
        const [totalAmount, setTotalAmount] = useState<number>(0);

        const getCartList = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'cart'));
                const carts: CartItem[] = [];
                querySnapshot.forEach((doc) => {
                    carts.push({ id: doc.id, ...doc.data() } as CartItem);
                });
                setCartList(carts);0
                calculateTotal(carts);
            } catch (error) {
                console.error("Error fetching cart list: ", error);
            }
        };

        const handleRefresh = () => {
            getCartList();
        };
        const calculateTotal = (carts: CartItem[]) => {
        const total = carts.reduce((acc: number, cart: CartItem) => {
            return acc + (cart.price ? parseFloat(cart.price) * cart.quantity : 0);
        }, 0);
        setTotalAmount(total);
    };

    const deleteCartItem = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'cart', id));
            const updatedCartList = cartList.filter(cart => cart.id !== id);
            setCartList(updatedCartList);
            calculateTotal(updatedCartList);
        } catch (error) {
            console.error("Error deleting cart item: ", error);
        }
    };

    useEffect(() => {
        getCartList();

        const unsubscribe = navigation.addListener('focus', () => {
            getCartList();
        });

        return unsubscribe;
    }, [navigation]);

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <View style={styles.cartImagePlaceholder}>
                <Image source={{ uri: item.image }} style={styles.popularImage} />
            </View>
            <View style={styles.cartItemInfo}>
                <Text style={styles.itemName}>{item.name || 'Unknown item'}</Text>
                <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>${item.price || 'Price unknown'}</Text>
            </View>
        </View>
    );

    const renderHiddenItem = ({ item }: { item: CartItem }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteCartItem(item.id)}
            >
                <Icon style={{ left: -15 }} name="delete" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="search" size={24} color="#000" />
                <Text style={styles.title}>Shopping Cart</Text>
                <TouchableOpacity onPress={handleRefresh}>
                    <Icon name="refresh" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.cartItemsContainer}>

                <SwipeListView
                    data={cartList}
                    renderItem={renderCartItem}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={(item) => item.id}
                    rightOpenValue={-75}  // Kéo sang trái để hiện nút xóa
                    disableRightSwipe={true}  // Vô hiệu hóa kéo sang phải
                />
                {cartList.length === 0 && (
                    <Text style={styles.emptyCartMessage}>No Cart found</Text>
                )}
            </View>

            {/* Recommended Products */}
            <Text style={styles.recommendTitle}>Furniture you might like</Text>
            <View style={styles.recommendContainer}>
                <View style={styles.recommendItem}>
                    {/* Placeholder Image */}
                    <View style={styles.recommendImagePlaceholder}>
                        <Image source={require('../../../assets/images/table1.webp')}
                            style={styles.popularImage} />
                    </View>
                    <Text style={styles.recommendName}>Sofa Name</Text>
                    <Text style={styles.recommendPrice}>$599</Text>
                </View>

                <View style={styles.recommendItem}>
                    {/* Placeholder Image */}
                    <View style={styles.recommendImagePlaceholder} >
                        <Image source={require('../../../assets/images/chair1.webp')}
                            style={styles.popularImage} />
                    </View>
                    <Text style={styles.recommendName}>Sofa Name</Text>
                    <Text style={styles.recommendPrice}>$499</Text>
                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Checkout', { cartList, totalAmount })} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
                <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity> */}
        </View>
    );
};


export default CartScreen;
const styles = StyleSheet.create({

    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#E29547',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,

    },
    deleteBtn: {
        width: 175,
        height: 125,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#E29547',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 15

    },
    clearCartButton: {
        backgroundColor: '#E29547',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    clearCartButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyCartMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
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
    cartItemsContainer: {
        height: 350, // Chiều cao cố định cho khu vực cuộn
        marginBottom: 20, // Khoảng cách phía dưới
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    popularImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cartImagePlaceholder: {
        width: 75,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        marginRight: 15,
    },
    cartItemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'outfit-regular',
    },
    itemQty: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
        fontWeight: '300',
        fontFamily: 'outfit-regular',
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        marginTop: 30,
        color: '#E29547',
        fontFamily: 'outfit-semibold',
    },
    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    couponInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        fontFamily: 'outfit-regular',
    },
    applyButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    recommendTitle: {
        fontSize: 18,
        // fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'outfit-semibold',

    },
    recommendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    recommendItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        width: '47%',
    },
    recommendImagePlaceholder: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
    recommendName: {
        fontSize: 14,
        // fontWeight: 'bold',
        marginVertical: 5,
        fontFamily: 'outfit-regular',

    },
    recommendPrice: {
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: 'outfit-semibold',
        color: '#121212'

    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 20,

    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 10,
        // marginTop: 10,
        // marginBottom: 150,
        height: 50
    },
    checkoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E29547'
    },
    quantityText: {
        fontSize: 13,
        // marginVertical:20,
        marginHorizontal: 13,
        fontFamily: 'outfit-regular',

    },
    del: {
        width: 24,
        height: 24,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E29547',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});