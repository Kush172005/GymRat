import { Platform, Linking } from 'react-native';
import { Pedometer } from 'expo-sensors';

export type MotionStatus = 'checking' | 'granted' | 'denied' | 'undetermined' | 'unavailable';

export async function getMotionStatus(): Promise<MotionStatus> {
  try {
    const available = await Pedometer.isAvailableAsync();
    if (!available) return 'unavailable';
    const { status } = await Pedometer.getPermissionsAsync();
    if (status === 'granted') return 'granted';
    if (status === 'undetermined') return 'undetermined';
    return 'denied';
  } catch {
    return 'unavailable';
  }
}

export async function requestMotionPermission(): Promise<MotionStatus> {
  try {
    const available = await Pedometer.isAvailableAsync();
    if (!available) return 'unavailable';
    const { status } = await Pedometer.requestPermissionsAsync();
    return status === 'granted' ? 'granted' : 'denied';
  } catch {
    return 'unavailable';
  }
}

export function openAppSettings(): void {
  Linking.openSettings().catch(() => {});
}

export function isIosStepsHistorySupported(): boolean {
  return Platform.OS === 'ios';
}
