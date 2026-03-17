# Динамічне виключення

```jsx
  const EXCLUDE_SLICE = ['theme', 'session'];

  export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
    const result = next(action);

    const state = store.getState();

    const stateToPersist: Partial<RootState> = {};

    for (const key in state) {
      if (!EXCLUDE_SLICE.includes(key)) {
        stateToPersist[key] = state[key];
      }
    }

    localStorage.setItem('root-state', JSON.stringify(stateToPersist));
    return result;
  };
```
