import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { cartActions } from '../action';
import { cartService } from '../service';

export const cartEpic = (action$: any) =>
  action$.pipe(
    ofType(cartActions.ADD_TO_CART),
    mergeMap((action) =>
      from(cartService.mockAddToCartService(action.payload)).pipe(
        mergeMap((product) => [cartActions.addToCartSuccess(product)]),
      ),
    ),
  );

export const removeCartEpic = (action$: any) =>
  action$.pipe(
    ofType(cartActions.REMOVE_FROM_CART),
    mergeMap((action) =>
      from(cartService.mockRemoveFromCartService(action.payload)).pipe(
        mergeMap((id) => [cartActions.removeFromCartSuccess(id)]),
      ),
    ),
  );

export const fetchProductsEpic = (action$: any) =>
  action$.pipe(
    ofType(cartActions.LOAD_PRODUCTS),
    mergeMap(() =>
      from(cartService.fetchProducts()).pipe(
        mergeMap((products: any) => [cartActions.loadProductsSuccess(products)]),
        catchError((error) => of(cartActions.loadProductsFailure(error.message))),
      ),
    ),
  );
