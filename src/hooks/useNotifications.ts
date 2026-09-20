import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { STORAGE_KEYS } from '../utils/storage';

const REMINDER_ID_KEY = 'nivesha:notif:reminder_id';
// A daily nudge in the evening, when a learner is more likely to have a
// free few minutes to keep their streak going.
const REMINDER_HOUR = 19;
const REMINDER_MINUTE = 0;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function ensureAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-reminder', {
      name: 'Daily learning reminder',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

async function scheduleDailyReminder() {
  await ensureAndroidChannel();
  // Clear any previous schedule first so toggling off/on never stacks duplicates.
  await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time for today's lesson 📈",
      body: 'Keep your streak going — a quick lesson or quiz takes just a few minutes.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: REMINDER_HOUR,
      minute: REMINDER_MINUTE,
    },
  });
  await AsyncStorage.setItem(REMINDER_ID_KEY, id);
}

async function cancelDailyReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
  await AsyncStorage.removeItem(REMINDER_ID_KEY).catch(() => {});
}

export function useNotifications() {
  const [enabled, setEnabledState] = useState(false);
  // expo-notifications is installed; local scheduled notifications work on
  // both platforms (this only uses on-device scheduling, no push token).
  const supported = true;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.notificationsEnabled)
      .then((v) => setEnabledState(v === 'true'))
      .catch(() => {});
  }, []);

  const setEnabled = useCallback(async (value: boolean) => {
    if (value) {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) {
        setEnabledState(false);
        await AsyncStorage.setItem(STORAGE_KEYS.notificationsEnabled, 'false').catch(() => {});
        return;
      }
      await scheduleDailyReminder().catch(() => {});
    } else {
      await cancelDailyReminder();
    }
    setEnabledState(value);
    await AsyncStorage.setItem(STORAGE_KEYS.notificationsEnabled, value ? 'true' : 'false').catch(() => {});
  }, []);

  return { enabled, setEnabled, supported };
}
