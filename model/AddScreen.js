import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { addAdAction } from '../adSettings/adSlice';
import { generateUniqueId } from '../adSettings/adService';
import { Picker } from '@react-native-picker/picker';
import useAuth from '../hooks/useAuth';

const AddScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Visos kategorijos'); 

  const handleAddAd = () => {
    const adWithId = {
      id: generateUniqueId(),
      title: title,
      description: description,
      category: category,
      ownerId: user.uid, 
    };
    dispatch(addAdAction(adWithId));
    navigation.navigate('Pagrindinis');
  };
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Pridėti skelbimą</Text>
      <TextInput
        style={styles.input}
        placeholder="Pavadinimas"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]} 
        placeholder="Aprašymas"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4} 
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Visos kategorijos" value="Visos kategorijos" />
        <Picker.Item label="Nešiojami kompiuteriai" value="Nešiojami kompiuteriai" />
        <Picker.Item label="Staliniai kompiuteriai" value="Staliniai kompiuteriai" />
        <Picker.Item label="Planšetiniai kompiuteriai" value="Planšetiniai kompiuteriai" />
        <Picker.Item label="Elektroninės skaityklės" value="Elektroninės skaityklės" />
        <Picker.Item label="Monitoriai" value="Monitoriai" />
        <Picker.Item label="Vaizdo plokštės" value="Vaizdo plokštės" />
        <Picker.Item label="Pagrindinės plokštės" value="Pagrindinės plokštės" />
        <Picker.Item label="Garso plokštės" value="Garso plokštės" />
        <Picker.Item label="Įvesties/išvesties išplėtimo plokštės" value="Įvesties/išvesties išplėtimo plokštės" />
        <Picker.Item label="Optiniai įrenginiai" value="Optiniai įrenginiai" />
        <Picker.Item label="korpusai ir priedai" value="korpusai ir priedai" />
        <Picker.Item label="Išorinės duomenų laikmenos" value="Išorinės duomenų laikmenos" />
        <Picker.Item label="Kompiuterių priedai ir aksesuarai" value="Kompiuterių priedai ir aksesuarai" />
        <Picker.Item label="Kabeliai, adapteriai ir priedai" value="Kabeliai, adapteriai ir priedai" />
      </Picker>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#FBCFCD"
        onPress={handleAddAd}
      >
        <Text style={styles.buttonText}>Pridėti skelbimą</Text>
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: "center",
    color: '#B38481',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 30,
    padding: 20,
    width: '100%',
  },
  multilineInput: {
    height: 100,
  },
});

export default AddScreen;