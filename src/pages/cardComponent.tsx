import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store.ts';
import './cardComponent.scss';
import { cartActions } from '../action';
import { icon_add_to_cart, icon_decrease_quantity, icon_increment_quantity } from '../assets';

interface Product {
  id: number;
  name: string;
  price: number;
  // Add any other product properties here (e.g. image, category, etc.)
}

const CardComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state: RootState) => state.cart.cart);

  /**
   * Track the quantity for each product using a dictionary:
   * key   = product ID
   * value = quantity
   */
  const [cartCount, setCartCount] = useState<{ [key: number]: number }>({});

  /**
   * Increase the quantity for a specific product.
   */
  const handleIncreaseCartCount = (product: Product) => {
    setCartCount((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1, // if not found, assume 0
    }));

    handleAddToCart(product); // sets the count value in cart view component
  };

  /**
   * Decrease the quantity for a specific product.
   * - If the quantity goes to 0 or below, remove it from the dictionary.
   */
  const handleDecreaseCartCount = (id: number) => {
    setCartCount((prev) => {
      const currentCount = prev[id] || 0;
      if (currentCount <= 1) {
        // remove the item entry completely
        const { [id]: _, ...rest } = prev; // destructure out this id
        return rest;
      }
      // otherwise decrement by 1
      return {
        ...prev,
        [id]: currentCount - 1,
      };
    });
    handleRemoveFromCart(id); // sets the count value in cart view component
  };
  /**
   * This loads all products/ desserts on load of the page
   * */
  useEffect(() => {
    dispatch(cartActions.loadProducts());
  }, [dispatch]);

  /**
   * handles the update/ increase in cart count
   * { product } is passed
   * */
  const handleAddToCart = (product: Product) => {
    dispatch(cartActions.addToCart({ ...product }));
  };

  /**
   * handles the update/ decrease in cart count
   * */
  const handleRemoveFromCart = (id: number) => {
    dispatch(cartActions.decreaseItemCart(id));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>Products</h2>
      <ul className="cardMain">
        {products.length === 0 && <p>Loading products...</p>}
        {products.map((product) => {
          const quantity = cartCount[product.id] || 0;
          return (
            <li key={product.id} className="dessertDisplay">
              <div className="dessertDiv">
                <img className="dessertImg" src={product.image.desktop} alt="dessert" />

                <div className={`addButton ${quantity > 0 && 'productBtn'}`}>
                  {quantity > 0 ? (
                    <div className="incrementBtn">
                      <div onClick={() => handleDecreaseCartCount(product.id)}>
                        {/*<img src={icon_decrease_quantity} alt="" />*/}
                        <img className={`buttonVol decreaseBTN`} src={icon_decrease_quantity} alt="" />
                      </div>
                      <span style={{ margin: '0 2.5rem' }}>{quantity}</span>
                      <div onClick={() => handleIncreaseCartCount(product)}>
                        <img className="buttonVol" src={icon_increment_quantity} alt="" />
                      </div>
                    </div>
                  ) : (
                    <div className="cartBtn" onClick={() => handleIncreaseCartCount(product)}>
                      <img src={icon_add_to_cart} alt="" />
                      Add to Cart
                    </div>
                  )}
                </div>
              </div>

              <div className="dessertDetails">
                <span className="dessertTitle">{product.name}</span>
                <span className="dessertDesc">{product.category}</span>
                <span className="dessertAmt">${parseFloat(product.price).toFixed(2)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CardComponent;
