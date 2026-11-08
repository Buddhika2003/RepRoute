import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEYS = {
  theme: 'app-theme',
  profile: 'app-profile',
  goals: 'app-goals',
  workoutEntries: 'workout-entries',
}

export async function loadLocalData(key, fallbackValue) {
  try {
    const savedValue = await AsyncStorage.getItem(key)

    return savedValue === null
      ? fallbackValue
      : JSON.parse(savedValue)
  } catch (error) {
    console.warn(`Could not load ${key}.`, error)
    return fallbackValue
  }
}

export async function saveLocalData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Could not save ${key}.`, error)
  }
}