import { CustomDialog, useDialog } from 'react-st-modal';
import React from 'react';
import { icon_order_confirm } from '../assets';
import './modal.scss';

// The element to be shown in the modal window
const Modal: React.FC = (items) => {
  // use this hook to control the dialog
  const dialog = useDialog();
  console.log(items);

  // const [value, setValue] = useState();

  return (
    <div className="modalDIV">
      <img src={icon_order_confirm} alt="" />
      <h3>Order Confirmed</h3>
      <p>We hope you enjoy your food!</p>
      <ul className="modalListItem">
        {items &&
          items.items.map((item) => (
            <div className="modalItems" key={item.id}>
              <div>
                <img className='modalImg' src={item.image.desktop} alt="" />
                <span className="cartName">{item.name}</span>
                <p>
                  <span className="cartQty">{item.quantity}x</span>
                  <span className="cartPrice">@${parseFloat(item.price).toFixed(2)}</span>
                  <span className="cartDesc">${parseFloat(item.price * item?.quantity).toFixed(2)}</span>
                </p>
              </div>
              {/*<div onClick={() => handleRemoveFromCart(item.id)}>*/}
              {/*    <img src={icon_remove_iten} alt="" className="cartDeleteItem"/>*/}
              {/*</div>*/}
            </div>
          ))}
      </ul>
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(items);
        }}
        className='modalConfirmBtn'
      >
        Start New Order
      </button>
    </div>
  );
};

export default Modal;
