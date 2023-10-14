import * as Keychain from 'react-native-keychain';

export const setSecureValue = async (key, value) => {
  try {
    await Keychain.setInternetCredentials(key, key, value);
    console.log(`Stored ${key} successfully`);
  } catch (err) {
    console.log(err);
  }
};

export const getSecureValue = async key => {
  try {
    const result = await Keychain.getInternetCredentials(key);
    if (result) {
      return result.password;
    }
    return false;
  } catch (error) {
    console.error(`Error retrieving value with key "${key}":`, error);
    return false;
  }
};

export const removeSecureValue = async key => {
  try {
    await Keychain.resetInternetCredentials(key);
    console.log(`${key} removed`);
  } catch (err) {
    console.log(err);
  }
};
