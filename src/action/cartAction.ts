export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_LIST_SUCCESS = 'REMOVE_FROM_CART_LIST_SUCCESS';
export const DECREASE_CART_ITEM = 'DECREASE_CART_ITEM';

export const addToCart = (product: { id: number; name: string; price: number }) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id: number) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const decreaseItemCart = (id: number) => ({
  type: DECREASE_CART_ITEM,
  payload: id,
});

export const addToCartSuccess = (product: {
  id: number;
  name: string;
  price: number;
  category: string;
  image: any;
}) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: product,
});

export const removeFromCartSuccess = (id: number) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: id,
});

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

// Other actions remain unchanged...

export const loadProducts = () => ({ type: LOAD_PRODUCTS });
export const loadProductsSuccess = (products: any[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: products,
});
export const loadProductsFailure = (error: string) => ({
  type: LOAD_PRODUCTS_FAILURE,
  payload: error,
});
