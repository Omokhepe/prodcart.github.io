// import { combineEpics } from 'redux-observable';
// import * as allCartEpic from './cartEpic.ts';
//
// function distructor(obj) {
//   return Object.keys(obj).map((item) => {
//     return obj[item];
//   });
// }
//
// export const { cartEpic, removeCartEpic, fetchProductsEpic } = allCartEpic;
//
// const rootEpic = combineEpics(...distructor(cartEpic));
//
// export default rootEpic;

import { combineEpics } from 'redux-observable';
import { cartEpic, removeCartEpic, fetchProductsEpic } from './cartEpic';

// Export each epic individually for reference
export { cartEpic, removeCartEpic, fetchProductsEpic };

// Combine all epics into one rootEpic
const rootEpic = combineEpics(cartEpic, removeCartEpic, fetchProductsEpic);

export default rootEpic;
