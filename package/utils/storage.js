import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Save a value to AsyncStorage
 * @param {string} key - The key to store data under
 * @param {any} value - The value to save (will be stringified)
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    // console.log(`[Storage] Saved ${key}`)
  } catch (error) {
    console.error(`[Storage] Error saving ${key}:`, error)
  }
}

/**
 * Retrieve a value from AsyncStorage
 * @param {string} key - The key to fetch data from
 * @returns {Promise<any|null>} - Parsed object or null if not found
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.error(`[Storage] Error getting ${key}:`, error)
    return null
  }
}

/**
 * Remove a specific key from AsyncStorage
 * @param {string} key
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    // console.log(`[Storage] Removed ${key}`)
  } catch (error) {
    console.error(`[Storage] Error removing ${key}:`, error)
  }
}

/**
 * Clear all data in AsyncStorage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    // console.log("[Storage] Cleared all data")
  } catch (error) {
    console.error("[Storage] Error clearing storage:", error)
  }
}

// SAVE 
export const saveItem = async (key, value) => {
  try {
    const storedValue = typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, storedValue);
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveBarangayId = async (id) => {
  try {
    await AsyncStorage.setItem("barangayId", id);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveUsername = async (username) => {
  try {
    await AsyncStorage.setItem("username", username);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const saveQuestionnaires = async (questions) => {
  try {
    await AsyncStorage.setItem("questions", JSON.stringify(questions));
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// FETCH

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) return null; // Return null if no value is found

    try {
      const parsedValue = JSON.parse(value);

      // Ensure the parsed value is an object or an array
      if (typeof parsedValue === "object" && parsedValue !== null) {
        return parsedValue;
      }
    } catch (error) {
      // console.warn(`Stored value for key "${key}" is not valid JSON.`);
    }

    // If parsing fails, return the raw value as a string
    return value;
  } catch (error) {
    console.error("Error retrieving item:", error);
    return null;
  }
};


export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getBarangayId = async () => {
  try {
    return await AsyncStorage.getItem("barangayId");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getUsername = async () => {
  try {
    return await AsyncStorage.getItem("username");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getQuestionnaires = async () => {
  try {
    const storedData = await AsyncStorage.getItem("questions");
    return storedData ? JSON.parse(storedData) : null; // Parse only if data exists
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// REMOVE
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

