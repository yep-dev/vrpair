import AsyncStorage from "@react-native-async-storage/async-storage"

const loadString = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

const saveString = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

const load = async (key: string): Promise<any | null> => {
  try {
    const item = await AsyncStorage.getItem(key)
    return item !== null ? JSON.parse(item) : null
  } catch {
    return null
  }
}

const save = async (key: string, value: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

const remove = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear()
  } catch {}
}

if (__DEV__) {
  global.AsyncStorage = AsyncStorage
}

export const storage = {
  loadString,
  saveString,
  load,
  save,
  remove,
  clear,
}
