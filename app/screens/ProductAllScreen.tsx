import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '@/firebaseConfig';

const db = getFirestore(app);

// Define Product interface
interface Product {
  id: string; // Assuming you have an id for each product
  name: string;
  image: string;
  price: number;
}

const ProductAllScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState<Product[]>([]); // Use Product type here
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Use Product type here
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch product list from Firestore
  const getProductList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'product'));
      const products: Product[] = []; // Use Product type here
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product); // Ensure correct typing
      });
      setAllProducts(products);
      setProductList(products);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Search handling
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setProductList(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProductList(filteredProducts);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Header */}
      {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '800' }}>Explore What</Text>
          <Text style={{ fontSize: 13, fontWeight: '300', fontFamily: 'outfit-regular' }}>User: {userEmail ? userEmail : 'No email found'}</Text>
        </View>
        <Image style={{ width: 32, height: 32 }} source={require('../../assets/images/IconNotif.png')} />
      </View> */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#a9a9a9" style={styles.iconStyle} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Chair, desk, lamp, etc"
          placeholderTextColor="#a9a9a9"
          value={searchQuery} // Hiển thị từ khóa tìm kiếm
          onChangeText={handleSearch} // Xử lý khi người dùng nhập từ khóa
        />
      </View>

      {/* Popular Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>PRODUCT</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProductAll')}>
          <Text style={styles.seeAllText}></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productRow}>
        {productList.length > 0 ? productList.map((product, index) => (
          <View key={index} style={styles.popularItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {
                productName: product.name,
                productImage: product.image
              })}
            >
              <Image source={{ uri: product.image }} style={styles.popularImage} />
              <Text style={styles.popularText}>{product.name ? product.name : 'Unknown Product'}</Text>
              <Text style={styles.popularPrice}>${product.price ? product.price : 'Unknown Price'}</Text>
            </TouchableOpacity>
          </View>
        )) : <Text>No products found</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    productRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    popularItem: {
      width: '48%',
      marginBottom: 10,
    },
    popularImage: {
      width: '100%',
      height: 250,
      borderRadius: 10,
    },
    popularText: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: '700',
      color: '#AAAAAA',
      fontFamily: 'outfit-regular'
    },
    popularPrice: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: '500',
      color: '#121212',
      fontFamily: 'outfit-semibold'
  
    },
    image: {
      width: 125,
      height: 56,
      borderRadius: 10,
    },
    text: {
      position: 'absolute',
      top: 15,
      left: 5,
      color: 'black',
      fontSize: 16,
      fontFamily: 'outfit-regular'
    },
    mainContainer: {
      padding: 20,
      backgroundColor: '#ffff',
    },
    image1: {
      width: 127,
      height: 195,
    },
    text1: {
      position: 'absolute',
      top: 15,
      left: 5,
      color: 'black',
      fontSize: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#AAAAAA',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 15,
      padding: 10,
    },
    iconStyle: {
      marginRight: 10,
    },
    inputStyle: {
      flex: 1,
      fontSize: 16,
    },
    bannerContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      marginVertical: 20,
      padding: 20,
    },
    bannerImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    bannerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#333',
    },
    discountText: {
      fontSize: 30,
      // fontWeight: 'bold',
      color: '#E29547',
      fontFamily: 'outfit-Poppins-Bold'
  
    },
    seeAllItemsText: {
      // marginTop: 10,
      color: '#E29547',
      fontSize: 14,
  
    },
    bannerText1: {
      fontSize: 14,
      // fontWeight: 'bold',
      fontFamily: 'outfit-regular',
      marginTop: 10,
      color: '#4E5471',
    },
    discountText1: {
      fontSize: 32,
      // fontWeight: 'bold',
      color: '#4E5471',
      fontFamily: 'outfit-Poppins-Bold'
    },
    discountText1off: {
      fontSize: 15,
      // fontWeight: 'bold',
      color: '#4E5471',
      marginTop: 18
    },
    seeAllItemsText1: {
      marginTop: 10,
      color: '#4E5471',
      fontSize: 14,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginTop: 10
    },
    sectionHeader1: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'outfit-semibold',
  
    },
    sectionTitle1: {
      fontSize: 13,
      fontWeight: '300',
      fontFamily: 'outfit-regular',
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '200',
      color: '#E29547',
      fontFamily: 'outfit-regular',
  
    },
  });

  export default ProductAllScreen;
