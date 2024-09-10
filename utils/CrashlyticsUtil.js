// CrashlyticsUtil.js
import { NativeModules, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

const { BuildConfig } = NativeModules;

export const logGitShaToCrashlytics = () => {
  if (Platform.OS === 'android' && BuildConfig) {
    const gitSha = BuildConfig.GIT_SHA;

    console.log('Git SHA: ', gitSha);

    // Set Git SHA as a custom attribute in Firebase Crashlytics
    crashlytics().setAttribute('git_sha', gitSha);
  }
};
