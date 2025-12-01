# Redux basic

> So this branch has the basic Redux setup,and uses the main Redux patterns
> Very important: RTK includes redux-thunk by default (applyMiddleware, combineReducer, redux-thunk)
> RTK have: [redux-thunk, devTools, combineReducer, applyMiddleware, ]
> RTK have: Boilerplate - меньше коду
> RTK have: immer - mutation checks (не думай про імутацію)

# What is happened here ?

Тут в нас є декілька речей [counter, posts, users] всі ці речі керуються за допомогою redux та підключається до store. Поки що ми працюємо з createStore та thunk, хоча toolkit вже підключений. Ми зробимо дуже прості речі це запити до placeholder json отримаємо posts та users, обробимо помилку, зробими loading, а також реалізуємо пагінацію, дуже частий case.

@@@@@@@@@@@@@@@@@@@@

- `createStore(reducer, _)` - DEAD
- `comibineReducer({reducer1, reducer2})` - RTK auto
- `applyMiddleware()` - RTK auto
- `redux-thunk` - RTK auto

@@@@@@@@@@@@@@@@@@@@

- `const store = configureStore({ reducer })` - create store RTK
- `function reducer(state, action)` - Clear function
- `<Provider store={store}>` - just provider
- `useDispatch()` - get dispatch
- `useSelector((state) => state.counter)` - get state
