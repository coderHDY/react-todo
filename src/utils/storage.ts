import storage from "localforage";

export const setStorage = async (key: string, value: any) => {
  try {
    await storage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const getStorage = async (key: string) => {
  try {
    const value = await storage.getItem(key);
    return value;
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = async (key: string) => {
  try {
    await storage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const clearStorage = async () => {
  try {
    await storage.clear();
  } catch (error) {
    console.error(error);
  }
};
