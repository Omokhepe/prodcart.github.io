import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../action';
import { RootState } from '../store';
import './cartview.scss';
import { icon_empty_cart, icon_remove_iten } from '../assets';
import { CustomDialog } from 'react-st-modal';
import Modal from './Modal.tsx';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total, cartQuantity } = useSelector((state: RootState) => state.cart.cart);

  const handleRemoveFromCart = (id: number) => {
    dispatch(cartActions.decreaseItemCart(id));
  };

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  console.log('@@@@@@', total);

  return (
    <div className="cartMain">
      <div className="cartInner">
        <h2 className="cartTitle">Your Cart ({totalQuantity})</h2>
        <ul>
          {total <= 0 ? (
            <div className="emptyCart">
              <img src={icon_empty_cart} alt="" />
              <p>Your added Items will appears here </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <li className="cartItems" key={item.id}>
                  <div>
                    <span className="cartName">{item.name}</span>
                    <p>
                      <span className="cartQty">{item.quantity}x</span>
                      <span className="cartPrice">@${parseFloat(item.price).toFixed(2)}</span>
                      <span className="cartDesc">
                        ${parseFloat((item.price * item?.quantity).toString()).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div onClick={() => handleRemoveFromCart(item.id)}>
                    <img src={icon_remove_iten} alt="" className="cartDeleteItem" />
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>

        {total > 0 && (
          <div className="cartTotal">
            <span>Order Total</span>
            <h3>${parseFloat(total).toFixed(2)}</h3>
          </div>
        )}

        <div className='cartNeutralTxt'>This is Carbon-Neutral Delivery</div>

        {/*<button>Confirm Order</button>*/}
        <button
          onClick={async () => {
            await CustomDialog(<Modal items={items} onClose={handleRemoveFromCart} />, {
              // title: '',
              showCloseIcon: true,
            });
          }}
          className='cartConfirmBtn'
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
