import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import 'regenerator-runtime/runtime';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import crashlytics from '@react-native-firebase/crashlytics';
import { logGitShaToCrashlytics } from '../utils/CrashlyticsUtil';
import '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/crashlytics';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function getUser() {
  return SecureStore.getItem("user")
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    logGitShaToCrashlytics();
    if (loaded) {
      crashlytics().setCrashlyticsCollectionEnabled(true);
      crashlytics().log('App Launched');
      setTimeout(() => {
        if (getUser()) router.navigate('/(tabs)')
      }, 200)

      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000)
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(order)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
