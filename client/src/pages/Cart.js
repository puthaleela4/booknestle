
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Sample cart data (replace with props)
  const sampleCart = [
    {
      id: 1,
      title: "THINK AND GROW RICH",
      author: "Napoleon Hill",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "THE MOSQUITO",
      author: "Timothy C. Winogrand",
      price: 13.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const items = cartItems.length ? cartItems : sampleCart;

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax - discount;

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <i className="fas fa-shopping-cart empty-cart-icon"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any books to your cart yet.</p>
        <Link to="/books" className="btn btn-primary">
          <i className="fas fa-book-open"></i> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items-section">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-author">by {item.author}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                className="cart-item-remove"
                onClick={() => onRemoveItem?.(item.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/books" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </Link>
            <button className="btn btn-primary">
              Update Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="promo-code">
            <h3>Have a promo code?</h3>
            <div className="promo-input">
              <input 
                type="text" 
                placeholder="Enter code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoApply}>Apply</button>
            </div>
            <p className="promo-hint">Try: SAVE10 or SAVE20</p>
          </div>

          <button className="btn btn-primary btn-block checkout-btn">
            <i className="fas fa-lock"></i> Proceed to Checkout
          </button>

          <div className="payment-methods">
            <p>We accept:</p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-discover"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;