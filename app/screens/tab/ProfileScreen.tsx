
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';

const ProfileScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const auth = getAuth();

  // Fetch the logged-in user's email
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

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Redirect to login screen after logout
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="search" size={24} color="#000" />
        <Text style={styles.title}>Profile</Text>
        <Icon name="refresh" size={24} color="#000" />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate('ProfileDetail')}>
                  <Image
          source={require('../../../assets/images/user1.jpg')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}> </Text>
          <Text style={styles.email}>{userEmail ? userEmail : 'No email found'}</Text>
        </View>
        </TouchableOpacity>

      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MyOrder')}>
        <Icon name="shopping-cart" size={24} color="#000" style={styles.icon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>My orders</Text>
          <Text style={styles.actionSubtitle}>Already have 10 orders</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name="location-on" size={24} color="#000" style={styles.icon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Shipping Addresses</Text>
          <Text style={styles.actionSubtitle}>03 Addresses</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name="credit-card" size={24} color="#000" style={styles.icon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Payment Method</Text>
          <Text style={styles.actionSubtitle}>You have 2 cards</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name="rate-review" size={24} color="#000" style={styles.icon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>My reviews</Text>
          <Text style={styles.actionSubtitle}>Reviews for 5 items</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('ChangePassword')} // Điều hướng đến ChangePassword
      >
        <Icon name="settings" size={24} color="#000" style={styles.icon} />
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Change Password</Text>
          <Text style={styles.actionSubtitle}>Notification, Password, FAQ, Contact</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={24} color="#000" />
      </TouchableOpacity>


      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#E29547',
    padding: 20,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#AAAAAA',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
  },
  logoutText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
