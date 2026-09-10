import Constants from 'expo-constants';

/** Expo Go cannot load Health Connect or HealthKit native modules. */
export function isExpoGo() {
  return (
    Constants.executionEnvironment === 'storeClient' ||
    Constants.appOwnership === 'expo'
  );
}
