import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProfileDetail = ({ route, navigation }: { route: any, navigation: any }) => {
  // Dữ liệu tĩnh của người dùng
  const user = {
    avatarUrl: '../../../assets/images/user1.jpg',
    fullName: 'Bùi Hải Dương',
    username: 'D1',
    email: 'dayduongtui@gmail.com',
    phone: '+84 981 992 900',
    location: 'HCM, Vietnam',
    about: 'A dedicated mechanical engineering student with a passion for AI and robotics.',
    order: 35,
    followers: 1500,
    following: 300,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay lại trang trước
      >
        <Ionicons name="arrow-back" size={29} color="black" />
      </TouchableOpacity>
      <View style={styles.coverContainer}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{user.fullName}</Text>
      {/* <Text style={styles.username}>@{user.username}</Text> */}

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.order}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Phone:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Location:</Text>
        <Text style={styles.info}>{user.location}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Me:</Text>
        <Text style={styles.info}>{user.about}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  coverContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#1877f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    // marginTop: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    // marginTop: 30,
  },
  username: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  infoContainer: {
    alignItems: 'flex-start',
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1877f2',
    marginBottom: 3,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Đảm bảo icon nằm trên các thành phần khác
  },
});

export default ProfileDetail;
