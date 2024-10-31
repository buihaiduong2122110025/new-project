import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Modal,
  Pressable
} from 'react-native';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '@/firebaseConfig';
import { Alert } from 'react-native';

const db = getFirestore(app);

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { productName, productImage, productPrice } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const images = [productImage, productImage, productImage];
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const rotateValue = useRef(new Animated.Value(0)).current;


  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (modalVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [modalVisible, countdown]);


  // Type the event parameter here
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.productImage} />
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const addToBag = async () => {
    try {
      const docRef = await addDoc(collection(db, 'cart'), {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: quantity
      });
      console.log("Product added to cart with ID: ", docRef.id);

      // Show the success modal
      setModalVisible(true);
      setCountdown(10); // Reset countdown to 10 seconds

      // Automatically close the modal after 10 seconds (10000 ms)
      setTimeout(() => {
        setModalVisible(false);
        setCountdown(10); // Reset countdown after modal is closed
      }, 10000);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      setModalVisible(false);  // Hide modal on error
    }
  };

  return (

    <ScrollView style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay lại trang trước
      >
        <Ionicons name="arrow-back" size={29} color="white" />
      </TouchableOpacity>

      {/* Product Image Slider */}
      <View style={styles.productImageContainer}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{productName}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.productPrice}>${productPrice}</Text>
          {/* Quantity Selector */} 
          {/* // In your renderFF */}
          <View style={styles.quantityContainer}>
            <Text style={{ marginRight: 10 }}>Qty: {quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Ionicons name="remove" size={16} color="#E29547" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Ionicons name="add-outline" size={16} color="#E29547" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Ratings and Reviews */}
        <View style={styles.ratingContainer}>
          <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Image source={require('../../assets/images/start.png')} style={styles.ratingProfileImage} />
              <Image source={require('../../assets/images/start.png')} style={styles.ratingProfileImage} />
              <Image source={require('../../assets/images/start.png')} style={styles.ratingProfileImage} />
              <Image source={require('../../assets/images/iconstartblack.png')} style={styles.ratingProfileImage} />
              <Text style={styles.ratingText}>4.6</Text>
            </View>
            <View>
              <Text style={styles.reviewText}>98 Reviews ➤ </Text>
            </View>
          </View>
          <View style={styles.ratingImages}>
            <Image source={require('./../../assets/images/user1.jpg')} style={styles.ratingProfileImage} />
            <Image source={require('./../../assets/images/user1.jpg')} style={styles.ratingProfileImage} />
            <Image source={require('./../../assets/images/user1.jpg')} style={styles.ratingProfileImage} />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={{ backgroundColor: '#FFEEDD', padding: 10, margin: 2, borderRadius: 10, width: 130 }}>
            <Text style={styles.tabActive}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, margin: 2, borderRadius: 5 }}>
            <Text style={styles.tabActive1}>Materials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, margin: 2, borderRadius: 5 }}>
            <Text style={styles.tabActive1}>Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur velit at massa vehicula, quis fringilla urna gravida.
        </Text>

        {/* Similar Products */}
        <Text style={styles.similarTitle}>Similar products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarProductsContainer}>
          <View style={styles.similarProductCard}>
            <Image source={require('../../assets/images/chair1.webp')} style={styles.similarProductImage} />
            <Text style={styles.similarProductName}>Sverom chair</Text>
            <Text style={styles.similarProductPrice}>$400</Text>
          </View>
          <View style={styles.similarProductCard}>
            <Image source={require('../../assets/images/table1.webp')} style={styles.similarProductImage} />
            <Text style={styles.similarProductName}>Grundtal sofa</Text>
            <Text style={styles.similarProductPrice}>$499</Text>
          </View>
        </ScrollView>

        {/* Add to Bag Button */}
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/Wishlist.png')} />
          {/* <TouchableOpacity style={styles.addToBagButton} onPress={() => navigation.navigate('Home', { screen: 'Cart' })}> */}
          <TouchableOpacity style={styles.addToBagButton} onPress={addToBag}>

            <Text style={styles.addToBagText}>Add to Cart</Text>
          </TouchableOpacity>


          {/* Success Modal */}

          {/* Success Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Add Success!</Text>
                <Text style={styles.modalText}>Added {quantity} {productName} to your cart!</Text>
                <Text style={styles.modalText}>Closing in {countdown} seconds...</Text> 
                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('Home', { screen: 'Cart' });
                    }}
                  >
                    <Text style={styles.modalButtonText}>Go to Cart</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButtonClose}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {/* {notification && (
              <View style={styles.notificationContainer}>
                <Text style={styles.notificationText}>{notification}</Text>
              </View>
            )} */}

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '86%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalButtonClose: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationContainer: {
    backgroundColor: '#4CAF50', // Màu xanh lá cây cho thông báo thành công
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  container: {

  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Đảm bảo icon nằm trên các thành phần khác
  },
  productInfo: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    marginTop: -20,
  },
  productTitle: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'outfit-regular',
  },
  productPrice: {
    fontSize: 20,
    color: '#E29547',
    marginVertical: 8,
    fontWeight: 'bold',
    fontFamily: 'outfit-semibold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E29547',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
    fontFamily: 'outfit-regular',
  },
  reviewText: {
    fontSize: 14,
    color: '#AAAAAA',
    marginLeft: 5,
    marginVertical: 10,
    fontFamily: 'outfit-regular',
  },
  ratingImages: {
    flexDirection: 'row',
    marginLeft: 8,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  ratingProfileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  tabActive: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E29547',
    fontWeight: 'bold',
  },
  tabActive1: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E29547',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    lineHeight: 20,
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  similarProductsContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  similarProductCard: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    padding: 10,
    alignItems: 'center',
  },
  similarProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  similarProductName: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  similarProductPrice: {
    fontSize: 14,
    color: '#E29547',
  },
  addToBagButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 16,
    borderRadius: 10,
    marginLeft: 10,
    // marginVertical: 16,

    alignItems: 'center',
    width: 284,
  },
  addToBagText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  productImageContainer: {
    height: 450,
    overflow: 'hidden',
  },
  productImage: {
    width: width,
    height: 450,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    bottom: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#E29547',
  },
  activeDot: {
    backgroundColor: '#E29547',
  },
  inactiveDot: {
    backgroundColor: '#CCCCCC',
  },
});

export default ProductDetailScreen;
