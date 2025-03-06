import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.bio}>Food enthusiast & home chef</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>97</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Recipes</Text>
        <View style={styles.recipeGrid}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity key={item} style={styles.recipeCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9' }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>Delicious Pasta</Text>
                <Text style={styles.recipeDetail}>30 min • Easy</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color="#2D3436" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'SF-Pro',
    color: '#666',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Bold',
    color: '#2D3436',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'SF-Pro',
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Bold',
    color: '#2D3436',
    marginBottom: 16,
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: 8,
  },
  recipeTitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    color: '#2D3436',
  },
  recipeDetail: {
    fontSize: 12,
    fontFamily: 'SF-Pro',
    color: '#666',
    marginTop: 4,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  settingsText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'SF-Pro',
    color: '#2D3436',
  },
});