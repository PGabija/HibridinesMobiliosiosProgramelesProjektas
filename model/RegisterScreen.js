import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = async () => {
    try {
      if (!email || !password || !firstName || !lastName || !phoneNumber) {
        console.error("All fields are required");
        return;
      }
      const user = await signUp(email, password, firstName, lastName, phoneNumber);

      console.log("User created:", user);
      navigation.navigate('Pagrindinis');
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="keyboard-arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/signup.png')} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder='Enter First Name'
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder='Enter Last Name'
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder='Enter Phone Number'
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter Email'
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder='Enter Password'
          />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.signupButton}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
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
  },
  image: {
    width: 165,
    height: 110,
  },
  formContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 20,
    marginBottom: 10,
  },
  signupButton: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'gray',
    fontWeight: '600',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#709999',
  },
});
