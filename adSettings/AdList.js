import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdDetails from './AdDetails';

const AdList = ({ ad, navigation, currentUser }) => {
  const adUserId = ad.userId;
  const currentUserId = currentUser?.uid;

  console.log('AdList item:', ad);

  if (!currentUserId) {
    console.error('Invalid current user or missing uid:', currentUser);
    return null; 
  }

  console.log('Current User:', currentUser);

  return (
    <View style={styles.itemContainer}>
      <AdDetails
        ad={ad}
        onUpdate={() => navigation.navigate('Atnaujinti', { ad })}
        onDelete={() => navigation.navigate('Ištrinti', { ad })}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {

    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default AdList;