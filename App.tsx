import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
    'SF-Pro-Bold': require('./assets/fonts/SF-Pro.ttf'),
    'SF-Mono': require('./assets/fonts/SF-Mono-Regular.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FAFAFA',
            },
            headerTitleStyle: {
              fontFamily: 'SF-Pro-Bold',
            },
            contentStyle: {
              backgroundColor: '#FAFAFA',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Recipes' }}
          />
          <Stack.Screen 
            name="RecipeDetail" 
            component={RecipeDetailScreen}
            options={{ title: 'Recipe' }}
          />
          <Stack.Screen 
            name="AddRecipe" 
            component={AddRecipeScreen}
            options={{ title: 'New Recipe' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'My Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}