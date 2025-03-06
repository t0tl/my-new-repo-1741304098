import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Homemade Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    time: '45 min',
    difficulty: 'Medium',
    saved: false,
  },
  {
    id: '2',
    title: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
    time: '10 min',
    difficulty: 'Easy',
    saved: true,
  },
  // Add more sample recipes as needed
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState(SAMPLE_RECIPES);

  const toggleSave = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, saved: !recipe.saved } : recipe
    ));
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <BlurView intensity={80} style={styles.recipeInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.meta}>{item.time}</Text>
          <Text style={styles.meta}>•</Text>
          <Text style={styles.meta}>{item.difficulty}</Text>
        </View>
      </BlurView>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => toggleSave(item.id)}
      >
        <Ionicons
          name={item.saved ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color="#FF6B35"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontFamily: 'SF-Pro',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  saveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF6B35',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});