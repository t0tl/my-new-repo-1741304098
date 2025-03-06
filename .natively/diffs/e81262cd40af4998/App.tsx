--- 
+++ 
@@ -1,271 +1,67 @@
+import 'react-native-gesture-handler';
+import { NavigationContainer } from '@react-navigation/native';
+import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { StatusBar } from 'expo-status-bar';
-import { Text, View, StyleSheet, TouchableOpacity, Platform, Image, ViewStyle, TextStyle } from 'react-native';
-import { useState } from 'react';
-import * as ImagePicker from 'expo-image-picker';
-import './global.css';
+import { SafeAreaProvider } from 'react-native-safe-area-context';
+import HomeScreen from './screens/HomeScreen';
+import RecipeDetailScreen from './screens/RecipeDetailScreen';
+import AddRecipeScreen from './screens/AddRecipeScreen';
+import ProfileScreen from './screens/ProfileScreen';
+import { useFonts } from 'expo-font';
 
-type ViewName = 'main' | 'instructions' | 'camera';
-type PlatformType = 'ios' | 'android';
+const Stack = createNativeStackNavigator();
 
-interface ButtonProps {
-  text: string;
-  onPress: () => void;
-  style?: ViewStyle | ViewStyle[];
-}
+export default function App() {
+  const [loaded] = useFonts({
+    'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
+    'SF-Pro-Bold': require('./assets/fonts/SF-Pro.ttf'),
+    'SF-Mono': require('./assets/fonts/SF-Mono-Regular.otf'),
+  });
 
-export default function App(): JSX.Element {
-  const [currentView, setCurrentView] = useState<ViewName>('main');
-  const [platform, setPlatform] = useState<PlatformType>('ios');
-  const [image, setImage] = useState<string | null>(null);
-
-  const isWeb = Platform.OS === 'web';
-  const photoButtonText = isWeb ? 'Upload Photo' : 'Take Photo';
-
-  const openCamera = async (): Promise<void> => {
-    try {
-      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
-      if (!granted) {
-        alert('Camera permission is required');
-        return;
-      }
-      const result = await ImagePicker.launchCameraAsync({
-        allowsEditing: true,
-        quality: 1,
-      });
-      if (!result.canceled) {
-        setImage(result.assets[0].uri);
-        setCurrentView('camera');
-      }
-    } catch (error) {
-      console.error(error);
-      alert('Error accessing camera');
-    }
-  };
-
-  const renderButton = ({ text, onPress, style }: ButtonProps): JSX.Element => (
-    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
-      <Text style={styles.buttonText}>{text}</Text>
-    </TouchableOpacity>
-  );
-
-  const views: Record<ViewName, JSX.Element> = {
-    main: (
-      <View style={styles.content}>
-        <Image source={require('/public/icosahedron.svg')} style={{maxWidth: "8em", maxHeight: "8em"}} />
-        <Text style={styles.title}>Welcome to Natively!</Text>
-        {/* {showInstallButton && renderButton({text: 'Install App', onPress: handleInstallClick, style: styles.installButton})} */}
-        {renderButton({ text: 'View Instructions', onPress: () => setCurrentView('instructions'), style: styles.instructionsButton})}
-        {renderButton({ text: photoButtonText, onPress: openCamera, style: styles.cameraButton })}
-      </View>
-    ),
-    instructions: (
-      <View style={styles.content}>
-        <Text style={styles.title}>{platform === 'ios' ? 'iOS' : 'Android'} Instructions</Text>
-        <View style={styles.section}>
-          {platform === 'ios' ? (
-            <>
-              <Text style={styles.text}>1. Open your iPhone's camera</Text>
-              <Text style={styles.text}>2. Press the QR code button at the top of the natively.dev website</Text>
-              <Text style={styles.text}>3. Scan the QR code</Text>
-            </>
-          ) : (
-            <>
-              <Text style={styles.text}>1. Download Expo Go from the Play Store</Text>
-              <Text style={styles.text}>2. Open Expo Go on your device</Text>
-              <Text style={styles.text}>3. Press the QR code button at the top of the natively.dev website</Text>
-              <Text style={styles.text}>4. Tap "Scan QR Code" in Expo Go</Text>
-              <Text style={styles.text}>5. Scan the QR code</Text>
-            </>
-          )}
-        </View>
-        <View style={styles.buttonContainer}>
-          {renderButton({
-            text: `Switch to ${platform === 'ios' ? 'Android' : 'iOS'}`,
-            onPress: () => setPlatform(p => p === 'ios' ? 'android' : 'ios'),
-            style: styles.platformButton
-          })}
-          {renderButton({
-            text: 'Back to Main',
-            onPress: () => setCurrentView('main'),
-            style: styles.backButton
-          })}
-        </View>
-      </View>
-    ),
-    camera: (
-      <View style={styles.cameraContainer}>
-        {image ? (
-          <>
-            <Image source={{ uri: image }} style={styles.previewImage} />
-            <View style={styles.cameraControls}>
-              {renderButton({
-                text: 'Back',
-                onPress: () => {
-                  setCurrentView('main');
-                  setImage(null);
-                },
-                style: [styles.backButton, styles.cameraBackButton]
-              })}
-              {renderButton({
-                text: isWeb ? 'Upload New Photo' : 'Take New Photo',
-                onPress: openCamera,
-                style: [styles.cameraButton, styles.cameraBackButton]
-              })}
-            </View>
-          </>
-        ) : (
-          <View style={styles.content}>
-            <Text style={styles.text}>No photo taken yet</Text>
-            {renderButton({ text: photoButtonText, onPress: openCamera })}
-          </View>
-        )}
-      </View>
-    )
-  };
+  if (!loaded) {
+    return null;
+  }
 
   return (
-    <View style={styles.container}>
-      <StatusBar style="auto" />
-      {views[currentView]}
-    </View>
+    <SafeAreaProvider>
+      <NavigationContainer>
+        <StatusBar style="dark" />
+        <Stack.Navigator
+          initialRouteName="Home"
+          screenOptions={{
+            headerStyle: {
+              backgroundColor: '#FAFAFA',
+            },
+            headerTitleStyle: {
+              fontFamily: 'SF-Pro-Bold',
+            },
+            contentStyle: {
+              backgroundColor: '#FAFAFA',
+            },
+          }}
+        >
+          <Stack.Screen 
+            name="Home" 
+            component={HomeScreen} 
+            options={{ title: 'Recipes' }}
+          />
+          <Stack.Screen 
+            name="RecipeDetail" 
+            component={RecipeDetailScreen}
+            options={{ title: 'Recipe' }}
+          />
+          <Stack.Screen 
+            name="AddRecipe" 
+            component={AddRecipeScreen}
+            options={{ title: 'New Recipe' }}
+          />
+          <Stack.Screen 
+            name="Profile" 
+            component={ProfileScreen}
+            options={{ title: 'My Profile' }}
+          />
+        </Stack.Navigator>
+      </NavigationContainer>
+    </SafeAreaProvider>
   );
-}
-
-interface Styles {
-  container: ViewStyle;
-  content: ViewStyle;
-  title: TextStyle;
-  section: ViewStyle;
-  heading: TextStyle;
-  text: TextStyle;
-  buttonContainer: ViewStyle;
-  button: ViewStyle;
-  buttonText: TextStyle;
-  platformButton: ViewStyle;
-  backButton: ViewStyle;
-  spacing: ViewStyle;
-  shadow: ViewStyle;
-  flexColumn: ViewStyle;
-  cameraButton: ViewStyle;
-  cameraContainer: ViewStyle;
-  previewImage: ViewStyle;
-  cameraControls: ViewStyle;
-  cameraBackButton: ViewStyle;
-  message: TextStyle;
-}
-
-const styles = StyleSheet.create<Styles>({
-  container: {
-    flex: 1,
-    backgroundColor: '0 0 7%',
-    padding: 20,
-  },
-  content: {
-    alignItems: 'center',
-    justifyContent: 'center',
-  },
-  title: {
-    fontSize: "1.7em",
-    fontWeight: '800',
-    textAlign: 'center',
-    marginBottom: ".8em",
-    color: 'white',
-    marginTop: ".8em",
-    fontFamily: 'system-ui, sans-serif',
-  },
-  section: {
-    marginBottom: "1em",
-    width: '100%',
-    alignItems: 'center',
-  },
-  heading: {
-    fontSize: "2em",
-    fontWeight: '700',
-    marginBottom: "1em",
-    color: '#333',
-    textAlign: 'center',
-  },
-  text: {
-    fontSize: 16,
-    fontWeight: '700',
-    color: 'white',
-    marginBottom: 8,
-    lineHeight: 24,
-    textAlign: 'center',
-    fontFamily: 'system-ui, sans-serif',
-  },
-  instructionsButton: {
-    backgroundColor: '#52A549',
-  },
-  installButton: {
-    backgroundColor: '#083D77',
-  },
-  cameraButton: {
-    backgroundColor: '#F95738',
-  },
-  platformButton: {
-    backgroundColor: '#52A549',
-  },
-  backButton: {
-    backgroundColor: '#666',
-  },
-  button: {
-    backgroundColor: '#67ab32',
-    padding: ".7em",
-    borderRadius: 8,
-    marginBottom: ".5em",
-    width: '80%',
-    shadowColor: '#000',
-    shadowOffset: {
-      width: 0,
-      height: 2,
-    },
-    shadowOpacity: 0.25,
-    shadowRadius: 3.84,
-    elevation: 5,
-  },
-  buttonText: {
-    color: '#fff',
-    fontSize: "1em",
-    fontWeight: 'bold',
-    textAlign: 'center',
-  },
-  shadow: {
-    shadowColor: '#000',
-    shadowOffset: { width: 0, height: 2 },
-    shadowOpacity: 0.2,
-    shadowRadius: 4,
-    elevation: 4,
-  },
-  flexColumn: {
-    flex: 1,
-    flexDirection: 'column',
-  },
-  cameraContainer: {
-    flex: 1,
-    width: '100%',
-    height: '100%',
-    justifyContent: 'space-between',
-  },
-  previewImage: {
-    width: '100%',
-    height: '80%',
-    resizeMode: 'contain',
-  },
-  cameraControls: {
-    flexDirection: 'row',
-    justifyContent: 'space-around',
-    padding: 20,
-    backgroundColor: 'transparent',
-  },
-  cameraBackButton: {
-    width: '40%',
-    marginBottom: 0,
-  },
-  message: {
-    fontSize: 16,
-    color: '#666',
-    marginBottom: 20,
-    textAlign: 'center',
-  },
-}); +}