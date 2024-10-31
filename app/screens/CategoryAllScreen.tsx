// // import * as React from 'react';
// // import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
// // import { TabView, SceneMap } from 'react-native-tab-view';

// // // Route cho danh mục sản phẩm đầu tiên
// // const FirstRoute = () => (
// //   <View style={styles.scene}>
// //     {/* Placeholder sản phẩm */}
// //     <View style={styles.productContainer}>
// //       <Image   source={require('../../assets/images/chair1.webp')}  style={styles.productImage} />
// //       <Text style={styles.productName}>Product Name 1</Text>
// //       <Text style={styles.productPrice}>$ --.--</Text>
// //     </View>
// //     <View style={styles.productContainer}>
// //       <Image   source={require('../../assets/images/chair1.webp')}  style={styles.productImage} />
// //       <Text style={styles.productName}>Product Name 2</Text>
// //       <Text style={styles.productPrice}>$ --.--</Text>
// //     </View>
// //   </View>
// // );

// // // Route cho danh mục sản phẩm thứ hai
// // const SecondRoute = () => (
// //   <View style={styles.scene}>
// //     {/* Placeholder sản phẩm */}
// //     <View style={styles.productContainer}>
// //       <Image  source={require('../../assets/images/chair1.webp')}  style={styles.productImage} />
// //       <Text style={styles.productName}>Product Name 3</Text>
// //       <Text style={styles.productPrice}>$ --.--</Text>
// //     </View>
// //     <View style={styles.productContainer}>
// //       <Image  source={require('../../assets/images/chair1.webp')} style={styles.productImage} />
// //       <Text style={styles.productName}>Product Name 4</Text>
// //       <Text style={styles.productPrice}>$ --.--</Text>
// //     </View>
// //   </View>
// // );

// // const renderScene = SceneMap({
// //   first: FirstRoute,
// //   second: SecondRoute,
// // });

// // export default function CategoryAllScreen() {
// //   const layout = useWindowDimensions();

// //   const [index, setIndex] = React.useState(0);
// //   const [routes] = React.useState([
// //     { key: 'first', title: 'Category 1' },  // Danh mục 1
// //     { key: 'second', title: 'Category 2' }, // Danh mục 2
// //   ]);

// //   return (
// //     <TabView
// //       navigationState={{ index, routes }}
// //       renderScene={renderScene}
// //       onIndexChange={setIndex}
// //       initialLayout={{ width: layout.width }}
// //       style={styles.tabView}
// //     />
// //   );
// // }

// // const styles = StyleSheet.create({
// //   scene: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5', // Màu nền cho mỗi tab
// //     padding: 10,
// //   },
// //   productContainer: {
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     marginBottom: 10,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   productImage: {
// //     width: 100,
// //     height: 100,
// //     marginBottom: 10,
// //     backgroundColor: '#e0e0e0', // Placeholder màu xám cho ảnh
// //   },
// //   productName: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#000',
// //   },
// //   productPrice: {
// //     fontSize: 14,
// //     color: '#777',
// //   },
// //   tabView: {
// //     marginTop: 10,
// //   },
// // });

// import * as React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';

// export default function CategoryAllScreen() {
//     const categories = [
//       'All',
//       'Politics',
//       'Science',
//       'Entertainment',
//       'Sports',
//       'Technology',
//       'Business',
//   ];

//   return (
//       <View style={styles.container}>
//           <Text style={styles.title}>Categories</Text>
//           <View style={styles.categoriesContainer}>
//               {categories.map((category, index) => (
//                   <TouchableOpacity key={index} style={styles.categoryButton}>
//                       <Text style={styles.categoryText}>{category}</Text>
//                   </TouchableOpacity>
//               ))}
//           </View>
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       padding: 20,
//       backgroundColor: '#f9f9f9',
//   },
//   title: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 20,
//   },
//   categoriesContainer: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       justifyContent: 'space-between',
//   },
//   categoryButton: {
//       borderColor: '#aaa',
//       borderWidth: 1,
//       borderRadius: 20,
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//       marginBottom: 10,
//   },
//   categoryText: {
//       fontSize: 16,
//       color: '#333',
//   },
// });
