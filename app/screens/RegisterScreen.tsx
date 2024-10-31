
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVSARp95HZ-TN3Qi4sKL_IKcmvZB1LzRM",
  authDomain: "fir-auth-94ce7.firebaseapp.com",
  projectId: "fir-auth-94ce7",
  storageBucket: "fir-auth-94ce7.appspot.com",
  messagingSenderId: "246547013798",
  appId: "1:246547013798:web:cd7bbafa9e87335b375467"
};

// Khởi tạo Firebase
let app: FirebaseApp | undefined;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp(); // Sử dụng app đã khởi tạo sẵn
}

export { app };
export default function Register({ navigation }: { navigation: any }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      console.log('User Register in successfully!');
      // Navigate to login screen after successful sign-up
      navigation.navigate('Login');
    } catch (error: any) {
      setError(error.message);  // Handle and display error message
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('../../assets/images/logo.png')}
            />

            <Text style={styles.title}>
              Sign up to <Text style={{ color: '#00bf63' }}>MyApp</Text>
            </Text>

            <Text style={styles.subtitle}>
              Get access to your portfolio and more
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignUp}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 'auto' }}
        >
          <Text style={styles.formFooter}>
            You have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Same styles as before...
  container: { paddingVertical: 24, paddingHorizontal: 0, flexGrow: 1, flexShrink: 1, flexBasis: 0 },
  title: { fontSize: 31, fontWeight: '700', color: '#1D2A32', marginBottom: 6 },
  subtitle: { fontSize: 15, fontWeight: '500', color: '#929292' },
  header: { alignItems: 'center', justifyContent: 'center', marginVertical: 36 },
  headerImg: { width: 100, height: 100, alignSelf: 'center', marginBottom: 36, borderRadius: 10 },
  form: { marginBottom: 24, paddingHorizontal: 24, flexGrow: 1, flexShrink: 1, flexBasis: 0 },
  formAction: { marginTop: 4, marginBottom: 16 },
  formFooter: { fontSize: 15, fontWeight: '600', color: '#222', textAlign: 'center', letterSpacing: 0.15 },
  input: { marginBottom: 16 },
  inputLabel: { fontSize: 17, fontWeight: '600', color: '#222', marginBottom: 8 },
  inputControl: { height: 50, backgroundColor: '#fff', paddingHorizontal: 16, borderRadius: 12, fontSize: 15, fontWeight: '500', color: '#222', borderWidth: 1, borderColor: '#C9D3DB' },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#00bf63', borderColor: '#00bf63' },
  btnText: { fontSize: 18, lineHeight: 26, fontWeight: '600', color: '#fff' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
