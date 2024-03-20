import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#C48793' }}>
        <View style={styles.container}>
            <Text style={styles.appTitle}>Skelbimai App</Text>
            <View style={styles.imageContainer}>
                <Image
                source={require('../assets/images/welcome.png')}
                style={styles.image}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.text, styles.linkText]}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#709999',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#709999',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#709999',
    marginLeft: 5,
  },
});

export default WelcomeScreen;