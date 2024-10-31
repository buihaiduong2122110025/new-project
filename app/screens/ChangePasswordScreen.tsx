import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { getAuth, updatePassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';

const ChangePassword = ({ route, navigation }: { route: any, navigation: any }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có giống nhau không
    if (newPassword !== confirmPassword) {
      Alert.alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert("Mật khẩu đã được cập nhật thành công!");
      } catch (error:any) {
        Alert.alert("Lỗi khi cập nhật mật khẩu: ", error.message);
      }
    } else {
      Alert.alert("Người dùng chưa đăng nhập.");
    }
  };

  return (
    <View style={styles.container}>

       {/* Back Icon */}
       <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay lại trang trước
      >
        <Ionicons name="arrow-back" size={29} color="black" />
      </TouchableOpacity>
      <Title>Change Password</Title>
      <TextInput
        label="Password Old"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Password New"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password New"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
       Change Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Đảm bảo icon nằm trên các thành phần khác
  },
});

export default ChangePassword;
