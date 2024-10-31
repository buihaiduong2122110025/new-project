import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const GetStartedScreen = ({ route, navigation }: { route: any, navigation: any }) => {

    return (
        <View style={styles.container}>
            <View style={styles.textheader}>
                <Text style={{
                    fontFamily: 'outfit', fontSize: 40,
                }}>Elegant </Text>

                <Text style={{ fontFamily: 'outfit', fontSize: 40, }}>simple </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 40, }}>Furnitures.</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Image style={styles.bg_img} source={require('../../assets/images/bg-started.png')} />

                <Image style={styles.img} source={require('../../assets/images/getstart.png')} />

            </View>
            <View style={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
            }}>
                <View >
                    <Text style={{ color:'#645F57' }}>
                        Affordable home furniture
                    </Text>
                    <Text style={{ color:'#645F57' }}>
                        designs & ideas.
                    </Text>
                </View>
                <TouchableOpacity
                     onPress={() => {
                        navigation.navigate('Login')}}>
                    <View style={{ width:110, height:110, backgroundColor:'black', marginLeft:20 ,display:'flex', alignItems:'center',
                         justifyContent:'center', borderRadius:99}}>
                    <Text style={{ color:'white', fontSize:16, fontFamily:'outfit'}}>Start</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GetStartedScreen

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#E2D3BC',
        alignItems: 'center',
        padding: 10,
    },
    img: {
        marginTop: 100,
        width: 340,
        height: 460,
        position: 'absolute',
    },
    bg_img: {
        width: 280,
        height: 100,
        position: 'absolute',
        top: 430, // Độ lệch từ trên
        left: -140, // Độ lệch từ trái
    },
    textheader: {
        width: 300,
        height: 100,
        textAlign: 'left',
        // backgroundColor: 'red',
        marginTop: 30,
    }
})


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Button, Image, ScrollView } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// import { useFonts } from 'expo-font';

// const GetStartedScreen = ({ route, navigation }: { route: any, navigation: any }) => {
//     const [activeTab, setActiveTab] = useState('Overview');

//     return (
//         <View style={styles.container}>
//             {/* Header Text */}
//             <View style={styles.textheader}>
//                 <Text style={{ fontFamily: 'outfit', fontSize: 40 }}>Elegant</Text>
//                 <Text style={{ fontFamily: 'outfit', fontSize: 40 }}>simple</Text>
//                 <Text style={{ fontFamily: 'outfit', fontSize: 40 }}>Furnitures.</Text>
//             </View>

//             {/* Background and Main Image */}
//             <View style={styles.imageContainer}>
//                 <Image style={styles.bg_img} source={require('../../assets/images/bg-started.png')} />
//                 <Image style={styles.img} source={require('../../assets/images/getstart.png')} />
//             </View>

//             {/* Tabs Section */}
//             <View style={styles.tabsContainer}>
//                 <TouchableOpacity onPress={() => setActiveTab('Overview')}>
//                     <Text style={activeTab === 'Overview' ? styles.activeTab : styles.inactiveTab}>Overview</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setActiveTab('Details')}>
//                     <Text style={activeTab === 'Details' ? styles.activeTab : styles.inactiveTab}>Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setActiveTab('Reviews')}>
//                     <Text style={activeTab === 'Reviews' ? styles.activeTab : styles.inactiveTab}>Reviews</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Tab Content */}
//             <ScrollView style={{ flex: 1 }}>
//                 {activeTab === 'Overview' && (
//                     <View>
//                         <Text style={styles.contentText}>This is an overview of our elegant furniture designs.</Text>
//                     </View>
//                 )}
//                 {activeTab === 'Details' && (
//                     <View>
//                         <Text style={styles.contentText}>These are detailed descriptions of our product offerings.</Text>
//                     </View>
//                 )}
//                 {activeTab === 'Reviews' && (
//                     <View>
//                         <Text style={styles.contentText}>See what others have to say about our furniture!</Text>
//                     </View>
//                 )}
//             </ScrollView>

//             {/* Bottom Section */}
//             <View style={styles.bottomSection}>
//                 <View>
//                     <Text style={{ color: '#645F57' }}>Affordable home furniture</Text>
//                     <Text style={{ color: '#645F57' }}>designs & ideas.</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                     <View style={styles.startButton}>
//                         <Text style={{ color: 'white', fontSize: 16, fontFamily: 'outfit' }}>Start</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default GetStartedScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#E2D3BC',
//         alignItems: 'center',
//         padding: 10,
//     },
//     img: {
//         marginTop: 100,
//         width: 340,
//         height: 460,
//         position: 'absolute',
//     },
//     bg_img: {
//         width: 280,
//         height: 100,
//         position: 'absolute',
//         top: 430,
//         left: -140,
//     },
//     textheader: {
//         width: 300,
//         height: 100,
//         textAlign: 'left',
//         marginTop: 30,
//     },
//     imageContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     },
//     tabsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 20,
//     },
//     activeTab: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#000',
//         borderBottomWidth: 2,
//         borderBottomColor: '#000',
//         paddingBottom: 5,
//     },
//     inactiveTab: {
//         fontSize: 16,
//         color: '#888',
//     },
//     contentText: {
//         fontSize: 16,
//         color: '#333',
//         textAlign: 'center',
//         marginVertical: 20,
//     },
//     bottomSection: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     startButton: {
//         width: 110,
//         height: 110,
//         backgroundColor: 'black',
//         marginLeft: 20,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 99,
//     },
// });
