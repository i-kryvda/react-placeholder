// middleware, навіщо він взагалі потрібен ? - для того щоб перехопити dispatch

// const logger = (store) => (next) => (action) => {
//   console.log(action);
//   return next(action);
// };

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(logger),
// });
