// import React from 'react';
import CardComponent from './cardComponent.tsx';
import CartView from './cartview.tsx';
import './dessertComponent.scss';
import React from 'react';

const DessertComponent = () => {
  return (
    <div className="dessertComponent">
      <CardComponent />
      <CartView />
    </div>
  );
};

export default DessertComponent;
