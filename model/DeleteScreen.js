import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteAdAction } from '../adSettings/adSlice';

const DeleteScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { ad } = route.params;

  const handleDeleteAd = () => {
    Alert.alert(
      'Patvirtinimas',
      'Ar jūs tikrai norite pašalinti šį skelbimą?',
      [
        {
          text: 'Atšaukti',
          onPress: () => console.log('Atšaukta'),
          style: 'atšaukti',
        },
        {
          text: 'Ištrinti',
          onPress: () => {
            dispatch(deleteAdAction(ad.id));
            navigation.navigate('Pagrindinis'); 
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ištrinti skelbimą</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Pavadinimas:</Text>
        <Text style={styles.infoText}>{ad.title}</Text>
        <Text style={styles.infoLabel}>Aprašymas:</Text>
        <Text style={styles.infoText}>{ad.description}</Text>
        <Text style={styles.infoLabel}>Kategorija:</Text>
        <Text style={styles.infoText}>{ad.category}</Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#FBCFCD"
        onPress={handleDeleteAd}
      >
        <Text style={styles.buttonText}>Ištrinti skelbimą</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: "#709999",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20, 
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    alignSelf: "center",
    color: '#997070',
  },
  infoBlock: {
    backgroundColor: "#FFFAFA",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#997070",
    borderWidth: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#997070',
  },
  infoText: {
    color: '#997070',
    marginBottom: 20,
  },
});

export default DeleteScreen;