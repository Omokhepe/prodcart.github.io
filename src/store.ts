import { configureStore } from '@reduxjs/toolkit';
// import * as redux from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import cartReducer from './reducer';
import cartEpic from './epic';

const epicMiddleware = createEpicMiddleware();

// const rootEpic = await (await import("./epic")).default();
const rootEpic = cartEpic;
// const rootReducer = cartReducer;

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };

// import { configureStore } from "@reduxjs/toolkit";
// import { createEpicMiddleware } from "redux-observable";
// import cartReducer from "./reducers/cartReducer";
// import rootEpic from "./epics"; // importing index.ts from epics folder
//
// const epicMiddleware = createEpicMiddleware();
//
// const store = configureStore({
//   reducer: {
//     cart: cartReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
// });
//
// epicMiddleware.run(rootEpic);
//
// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { createEpicMiddleware, combineEpics } from 'redux-observable';
// import cartReducer from './reducer/cartReducer';
// import { cartEpic, removeCartEpic, fetchProductsEpic } from './epic/cartEpic';
//
// const epicMiddleware = createEpicMiddleware();
//
// const rootEpic = combineEpics(cartEpic, removeCartEpic, fetchProductsEpic);
//
// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
// });
//
// epicMiddleware.run(rootEpic);
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export { store };
