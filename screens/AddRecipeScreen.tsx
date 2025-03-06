
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function AddRecipeScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Here you would typically save the recipe to your storage
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageSelector} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera-outline" size={40} color="#999" />
            <Text style={styles.placeholderText}>Add Recipe Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Recipe Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Cooking Time"
            value={time}
            onChangeText={setTime}
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Difficulty"
            value={difficulty}
            onChangeText={setDifficulty}
            placeholderTextColor="#999"
          />
        </View>

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Instructions (step by step)"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
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
  imageSelector: {
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
    fontFamily: 'SF-Pro',
  },
  form: {
    padding: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'SF-Pro',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
  },
});
