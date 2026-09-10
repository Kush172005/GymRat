import { Linking } from 'react-native';

export function openAppSettings() {
  Linking.openSettings().catch(() => {});
}
