import { cartActions } from '../action';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: image;
  quantity?: number;
}

interface CartState {
  products: Product[];
  items: Product[];
  total: number;
  cartQuantity: number;
  error: string | null;
}

const initialState: CartState = {
  products: [],
  items: [],
  total: 0,
  cartQuantity: 0,
  error: null,
};

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     decreaseCartItem: (state, action: PayloadAction<number>) => {
//       const id = action.payload;
//       const product = state.items.find((item) => item.id === id);
//
//       if (!product) return; // Item not found, do nothing
//
//       product.quantity -= 1; // Immer takes care of immutability
//       state.total -= product.price;
//
//       // If quantity hits 0 or less, remove from items
//       if (product.quantity <= 0) {
//         state.items = state.items.filter((item) => item.id !== id);
//       }
//     },
//     // ...other reducers like addToCart
//   },
// });

const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    // case cartActions.ADD_TO_CART_SUCCESS: {
    //   const product = state.items.findIndex((item) => item.id === action.payload.id);
    //   if (product && product.quantity) {
    //     product.quantity += 1;
    //   } else {
    //     state.items.push({ ...action.payload, quantity: 1 });
    //   }
    //   return {
    //     ...state,
    //     total: state.total + action.payload.price,
    //   };
    // }
    case cartActions.ADD_TO_CART_SUCCESS: {
      const productIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (productIndex >= 0) {
        // We need to clone the array and the item
        const updatedItems = [...state.items];
        const existingItem = { ...updatedItems[productIndex] };
        // const product = state.items[productIndex];

        existingItem.quantity += 1; // increment quantity immutably
        updatedItems[productIndex] = existingItem;
        console.log(existingItem);
        return {
          ...state,
          items: updatedItems,
          cartQuantity: existingItem.quantity,
          total: state.total + action.payload.price,
        };
      } else {
        // if item doesn't exist, push a new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          cartQuantity: state.cartQuantity,
          total: state.total + action.payload.price,
        };
      }
    }

    case cartActions.DECREASE_CART_ITEM: {
      const productIndex = state.items.findIndex((item) => item.id === action.payload);
      if (productIndex >= 0) {
        const product = state.items[productIndex];
        // If quantity is 1, remove item entirely (optional behavior)
        if (product.quantity === 1) {
          state.total -= product.price;
          state.items.splice(productIndex, 1);
        } else {
          // Decrement the quantity
          product.quantity -= 1;
          // Subtract the product price from total
          state.total -= product.price;
        }
      }
      return { ...state };
    }

    case cartActions.REMOVE_FROM_CART_LIST_SUCCESS: {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product && product.quantity) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        cartQuantity: state.cartQuantity + action.payload.quantity,
        total: state.total + action.payload.price,
      };
    }

    case cartActions.REMOVE_FROM_CART_SUCCESS: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      const removedItem = state.items.find((item) => item.id === action.payload);
      return {
        ...state,
        items: updatedItems,
        cartQuantity: state.cartQuantity - (removedItem?.quantity ?? 0),
        total: state.total - (removedItem?.price ?? 0) * (removedItem?.quantity ?? 0),
      };
    }

    case cartActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };

    case cartActions.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
