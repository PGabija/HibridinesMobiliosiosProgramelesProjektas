import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AdList from '../adSettings/AdList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from '../config/Firebase';
import useAuth from '../hooks/useAuth';
import { setVisibleUsers } from '../adSettings/adSlice';

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const visibleUsers = useSelector((state) => state.ads.visibleUsers);

  const ads = useSelector((state) => state.ads.ads);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDesc, setSearchDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Visos kategorijos');
  const [showOnlyMyAds, setShowOnlyMyAds] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredAds = ads.filter((ad) => {
    const hasSearchTerm = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const hasSearchDesc = ad.description.toLowerCase().includes(searchDesc.toLowerCase());
    const isCategoryMatch = selectedCategory === 'Visos kategorijos' || ad.category === selectedCategory;
    const isMyAd = showOnlyMyAds ? ad.ownerId === user?.uid : true;

    return hasSearchTerm && hasSearchDesc && isCategoryMatch && isMyAd;
  });

  const handleLogout = async () => {
    dispatch(setVisibleUsers([]));
    await signOut();
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleAdsChange = useCallback(() => {
    console.log('MainScreen rendered');
    console.log('Ads in Redux state:', JSON.stringify(ads));
    console.log('Filtered Ads:', JSON.stringify(filteredAds));
    setLoading(false);
  }, [ads, filteredAds, user]);

  useEffect(() => {
    if (user && !visibleUsers.includes(user.uid)) {
      dispatch(setVisibleUsers([...visibleUsers, user.uid]));
    }
  }, [user, visibleUsers, dispatch]);

  useEffect(() => {
    if (user) {
      handleAdsChange();
    }
  }, [ads, user, handleAdsChange]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => setShowOnlyMyAds(!showOnlyMyAds)}>
              <Text style={styles.filterMyAds}>
                {showOnlyMyAds ? 'Rodyti visus skelbimus' : 'Rodyti tik mano skelbimus'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.searchIconContainer} onPress={toggleSearch}>
              <Icon name="search" size={24} color="#fff" style={styles.searchIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      <SafeAreaView style={styles.adsContainer}>
      {isSearchExpanded && (
            <View style={styles.filterContainer}>
              
              <TextInput
                style={styles.expandedInput}
                placeholder="Pavadinimas"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
              />
              <TextInput
                style={styles.expandedInput}
                placeholder="Aprašymas"
                value={searchDesc}
                onChangeText={(text) => setSearchDesc(text)}
              />
            </View>
          )}
        <View style={styles.pickerAndSearchContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.categoryPicker}
          >
            <Picker.Item label="Visos kategorijos" value="Visos kategorijos" />
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
          </View>
          {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />) : (
          <FlatList
            data={filteredAds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AdList ad={item} navigation={navigation} currentUser={user} />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#997070',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIconContainer: {
    color: 'white',
    backgroundColor: '#709999',
    borderColor: '#B6B6B4',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  searchIcon: {
    marginRight: 1,
  },
  logoutButton: {
    color: 'white',
    backgroundColor: '#709999',
    borderColor: '#B6B6B4',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10, 
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  adsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  pickerAndSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryPicker: {
    height: 50,
    width: '100%', 
    color: '#8C8C8C',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  expandedInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    width: '45%', 
    color: '#C0C0C0',
  },
  filterMyAds: {
fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#709999',
    borderColor: '#B6B6B4',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    
  },
});

export default MainScreen;