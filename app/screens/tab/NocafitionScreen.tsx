import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using for icons

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="search" size={24} color="#000" />
        <Text style={styles.title}>Notification</Text>
        <Icon name="refresh" size={24} color="#000" />
      </View>

      {/* Notification List */}
      <ScrollView style={styles.notificationContainer}>
        
        {/* Notification Item 1 */}
        <TouchableOpacity style={styles.notificationItem}>
        <Image
              source={require('../../../assets/images/chair1.webp')}
            
            style={styles.notificationImage}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>Your order #123456789 has been confirmed</Text>
            <Text style={styles.notificationDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.
            </Text>
            <Text style={styles.notificationTagNew}>NEW</Text>
          </View>
        </TouchableOpacity>

        {/* Notification Item 2 */}
        <TouchableOpacity style={styles.notificationItem}>
        <Image
              source={require('../../../assets/images/chair1.webp')}
            
            style={styles.notificationImage}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>Your order #123456789 has been canceled</Text>
            <Text style={styles.notificationDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Notification Section (for special offers) */}
        <View style={styles.specialOfferContainer}>
          <Text style={styles.specialOfferTitle}>Discover hot sale furnitures this week.</Text>
          <Text style={styles.specialOfferDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.
          </Text>
          <Text style={styles.notificationTagHot}>HOT!</Text>
        </View>

        {/* More Notification Items */}
        <TouchableOpacity style={styles.notificationItem}>
          <Image
              source={require('../../../assets/images/chair1.webp')}
            
            style={styles.notificationImage}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>Your order #123456789 has been shipped successfully</Text>
            <Text style={styles.notificationDescription}>
              Please help us to confirm and rate your order to get 10% discount code for next order.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Add more notifications similarly */}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

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
    marginTop:40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContainer: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
  },
  notificationTagNew: {
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  notificationTagHot: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  specialOfferContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  specialOfferTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialOfferDescription: {
    fontSize: 12,
    color: '#666',
  },
});
