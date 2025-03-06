
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { RouteProp } from '@react-navigation/native';

interface Recipe {
  title: string;
  image: string;
  time: string;
  difficulty: string;
  saved: boolean;
}

type RecipeDetailParams = {
  recipe: Recipe;
};

type Props = {
  route: RouteProp<{ params: RecipeDetailParams }, 'params'>;
};

export default function RecipeDetailScreen({ route }: Props) {
  const { recipe } = route.params;
  const [isSaved, setIsSaved] = useState(recipe.saved);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing ${recipe.title} recipe!`,
        title: recipe.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <BlurView intensity={80} style={styles.headerInfo}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.meta}>{recipe.time}</Text>
            <Text style={styles.meta}>•</Text>
            <Text style={styles.meta}>{recipe.difficulty}</Text>
          </View>
        </BlurView>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.text}>
            • 2 cups all-purpose flour{'\n'}
            • 1 cup warm water{'\n'}
            • 2 tablespoons olive oil{'\n'}
            • 1 teaspoon salt{'\n'}
            • 1 teaspoon sugar{'\n'}
            • 2 1/4 teaspoons active dry yeast
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.text}>
            1. Mix warm water, yeast, and sugar{'\n'}
            2. Add flour, salt, and olive oil{'\n'}
            3. Knead until smooth{'\n'}
            4. Let rise for 1 hour{'\n'}
            5. Shape and add toppings{'\n'}
            6. Bake at 450°F for 15-20 minutes
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsSaved(!isSaved)}
        >
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#FF6B35"
          />
          <Text style={styles.actionText}>
            {isSaved ? 'Saved' : 'Save Recipe'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={24} color="#FF6B35" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontFamily: 'SF-Pro',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 20,
    color: '#2D3436',
    marginBottom: 16,
  },
  text: {
    fontFamily: 'SF-Pro',
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontFamily: 'SF-Pro',
    fontSize: 16,
    color: '#FF6B35',
    marginLeft: 8,
  },
});
