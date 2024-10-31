import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '@/firebaseConfig'; // Đảm bảo đường dẫn cho đúng

const LoginWithOTPScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState(null);

  const signin = () => {
    if (!phoneNumber) return;

    // Tạo RecaptchaVerifier và gán vào `recaptcha-container`
    const verifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    }, auth);

    signInWithPhoneNumber(auth, phoneNumber, verifier)
      .then((confirmationResult) => {
        setResult(confirmationResult); // Lưu lại kết quả để dùng cho xác nhận OTP
        setStep('VERIFY_OTP');
      })
      .catch((err) => {
        alert(`Error during sign-in: ${err.message}`);
      });
  };

  const ValidateOtp = () => {
    if (!otp) return;

    result.confirm(otp)
      .then(() => {
        setStep('VERIFY_SUCCESS');
      })
      .catch(() => {
        alert("Incorrect code");
        setStep('VERIFY_FAIL');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        {step === 'INPUT_PHONE_NUMBER' && (
          <View>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <View id="recaptcha-container" />
            <TouchableOpacity style={styles.button} onPress={signin}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'VERIFY_OTP' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your OTP"
              keyboardType="number-pad"
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={ValidateOtp}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'VERIFY_SUCCESS' && <Text style={styles.successText}>Verify success</Text>}
        {step === 'VERIFY_FAIL' && <Text style={styles.failText}>Verify Fail</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  successText: {
    fontSize: 18,
    color: 'green',
  },
  failText: {
    fontSize: 18,
    color: 'red',
  },
});

export default LoginWithOTPScreen;
