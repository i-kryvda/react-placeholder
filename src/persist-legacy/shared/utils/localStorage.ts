// Універсальні функції для роботи з localStorage

// Використання: preloadedState: loadState<RootState>(STORAGE_KEY),
export const getStorage = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (e) {
    console.error(`Cannot load state from "${key}"`, e);
    return undefined;
  }
};

// Використання: saveState(STORAGE_KEY, store.getState());
export const setStorage = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error(`Cannot save state to "${key}"`, e);
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Cannot remove state from "${key}"`, e);
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (e) {
    console.error("Cannot clear localStorage", e);
  }
};
