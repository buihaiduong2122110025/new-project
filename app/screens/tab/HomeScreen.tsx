import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { app } from '@/firebaseConfig';

import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);

// Định nghĩa kiểu dữ liệu cho Category và Product
interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string; // ID của danh mục

}

const FeedScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Lưu tất cả sản phẩm
  const [searchQuery, setSearchQuery] = useState(''); // State cho từ khóa tìm kiếm
  const auth = getAuth();


  // Hàm lọc sản phẩm theo category
  const filterProductsByCategory = (categoryId: string) => {
    const filteredProducts = allProducts.filter(
      (product) => product.categoryId === categoryId
    );
    setProductList(filteredProducts);
  };

  // Hàm lấy danh sách category từ Firestore
  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      const categories: Category[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name && data.image) {  // Kiểm tra sự tồn tại của các trường cần thiết
          categories.push({
            id: doc.id,
            name: data.name,
            image: data.image
          });
        }
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  // Hàm lấy danh sách product từ Firestore
  const getProductList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'product'));
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name && data.image && data.price) {  // Kiểm tra sự tồn tại của các trường cần thiết
          products.push({
            id: doc.id,
            name: data.name,
            image: data.image,
            price: data.price,
            categoryId: data.categoryId
          });
        }
      });
      setAllProducts(products);
      setProductList(products);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Cập nhật từ khóa tìm kiếm
    if (query === '') {
      setProductList(allProducts); // Hiển thị lại tất cả sản phẩm nếu không có từ khóa
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProductList(filteredProducts); // Cập nhật danh sách sản phẩm đã lọc
    }
  };

  useEffect(() => {
    getCategoryList();
    getProductList();

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
    <ScrollView style={styles.mainContainer}>
      {/* Header */}
      <View style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20
      }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '800' }}>Explore What</Text>
          <Text style={{ fontSize: 20, fontWeight: '800' }}>Your Home Needs</Text>

          <Text style={{ fontSize: 13, fontWeight: '300', fontFamily: 'outfit-regular' }}>User: {userEmail ? userEmail : 'No email found'}</Text>
        </View>
        <Image style={{ width: 32, height: 32 }} source={require('../../../assets/images/IconNotif.png')} />
      </View>
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

      <View style={styles.container}>
        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all →</Text>
          </TouchableOpacity>
        </View>

        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ display: 'flex', flexDirection: 'row' }}>
          {categoryList.length > 0 ? categoryList.map((category, index) => (
            <View key={index} style={{ marginHorizontal: 10 }}>
              <Image
                style={styles.image}
                source={{ uri: category.image }} // Sử dụng đường dẫn hoặc URL từ trường image
              />
              <Text style={styles.text}>{category.name ? category.name : 'Unknown Category'}</Text>
            </View>
          )) : <Text>No categories found</Text>}
        </ScrollView> */}

        {/* Nút "Tất cả" để hiển thị tất cả sản phẩm */}

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ display: 'flex', flexDirection: 'row' }}
        >

          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setProductList(allProducts)} // Khi nhấn vào, sẽ hiển thị tất cả sản phẩm
          >
            <Image
              style={styles.image}
              source={require('../../../assets/images/banner.png')}            />
            <Text style={styles.text}>All</Text>
          </TouchableOpacity>
          {categoryList.length > 0 ? (
            categoryList.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginHorizontal: 10 }}
                onPress={() => filterProductsByCategory(category.id)} // Thêm sự kiện nhấn vào category
              >
                <Image
                  style={styles.image}
                  source={{ uri: category.image }}
                />
                <Text style={styles.text}>
                  {category.name ? category.name : 'Unknown Category'}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No categories found</Text>
          )}
        </ScrollView>
        {/* Banner Section */}

        <ImageBackground source={require('../../../assets/images/banner.png')} style={styles.bannerContainer}>

          <Text style={styles.bannerText1}>High quality sofa started</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.discountText1}>70% </Text>
            <Text style={styles.discountText1off}>off </Text>
          </View>
          <Text style={styles.seeAllItemsText1}>See all items →</Text>
        </ImageBackground>


        {/* Popular Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductAll')}>
            <Text style={styles.seeAllText}>See all →</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.productRow}>
          {productList.length > 0 ? productList.map((product, index) => (
            <View key={index} style={styles.popularItem}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {
                  productName: product.name,
                  productImage: product.image,
                  productPrice: product.price

                })}
              >
                <Image source={{ uri: product.image }} style={styles.popularImage} />
                <Text style={styles.popularText}>{product.name ? product.name : 'Unknown Product'}</Text>
                <Text style={styles.popularPrice}>${product.price ? product.price : 'Unknown Product'}</Text>
              </TouchableOpacity>
            </View>

          )) : <Text>No products found</Text>}
        </View> */}


        <View style={styles.productRow}>
          {productList.length > 0 ? (
            productList.map((product, index) => (
              <View key={index} style={styles.popularItem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detail', {
                    productName: product.name,
                    productImage: product.image,
                    productPrice: product.price,
                  })}
                >
                  <Image source={{ uri: product.image }} style={styles.popularImage} />
                  <Text style={styles.popularText}>{product.name}</Text>
                  <Text style={styles.popularPrice}>${product.price}</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No products found</Text>
          )}
        </View>
        <ImageBackground source={require('../../../assets/images/banner2.png')} style={styles.bannerContainer}>
          <Text style={styles.discountText}>Sale</Text>
          <Text style={styles.seeAllItemsText}>All chair up to{''} <Text style={{
            fontFamily: 'outfit-Poppins-Bold', fontSize: 20
          }}>70%</Text> off</Text>
        </ImageBackground>

        {/* Rooms Section */}
        <View style={styles.sectionHeader1}>
          <Text style={styles.sectionTitle}>Rooms</Text>
          <Text style={styles.sectionTitle1}>Furniture for every corner in your home</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ display: 'flex', flexDirection: 'row', marginBottom: 30 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Image
              style={styles.image1}
              source={require('../../../assets/images/imagerooms.png')}
            />
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <Image
              style={styles.image1}
              source={require('../../../assets/images/imagerooms2.png')}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Image
              style={styles.image1}
              source={require('../../../assets/images/imagerooms3.png')}
            />
          </View>
        </ScrollView>

      </View>
    </ScrollView >
  )
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {},
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
    height:200,
    // width:'',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginVertical: 20,
    padding: 20,
  },
  // bannerImage: {
  //   width: '100%',
  //   height: 150,
  //   borderRadius: 10,
  // },
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
