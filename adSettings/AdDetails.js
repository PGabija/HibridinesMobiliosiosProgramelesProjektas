import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const AdDetails = ({ ad, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { category } = ad;

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isExpanded ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, isExpanded]);

  return (
    <TouchableOpacity style={styles.detailsContainer} onPress={toggleDetails}>
      <Text style={styles.title}>{ad.title}</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.description}>{`Aprašymas: ${ad.description}`}</Text>
        <Text style={styles.category}>{`Kategorija: ${category}`}</Text>
        {isExpanded && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onUpdate(ad)}>
              <Text style={styles.actionText}>Atnaujinti</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonDelete} onPress={() => onDelete(ad.id)}>
              <Text style={styles.actionTextDelete}>Ištrinti</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#997070',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: "center",
  },
  description: {
    color: '#FFE6E8',
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
  },
  actionButtonDelete: {
    backgroundColor: '#800517',
    padding: 10,
    borderRadius: 20,
    width: '35%',
    alignItems: 'center',
  },
  actionText: {
    color: '#997070',
    fontWeight: 'bold',
  },
  actionTextDelete: {
    color: '#fff',
    fontWeight: 'bold',
  },
  category: {
    marginTop: 5,
    marginBottom: 30,
    color: '#FFE6E8',
  },
});

export default AdDetails;