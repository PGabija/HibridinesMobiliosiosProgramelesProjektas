import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 
      console.log('Prisijungimo sėkmingas!', userCredential);
    } catch (error) {
      console.error('Prisijungimo klaida:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="keyboard-arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/login.png')} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
          <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C48793',
  },
  backButton: {
    backgroundColor: '#709999',
    padding: 5,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 320,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 165,
    height: 140,
    
  },
  formContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  input: {
    padding: 15,
    backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 25,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#709999',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  orText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
  },
  signupText: {
    color: 'gray',
    fontWeight: '600',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#709999',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginLeft: 10,
    marginBottom: 5,
  },
});