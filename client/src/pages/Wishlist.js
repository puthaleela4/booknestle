
import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  // Sample wishlist data
  const wishlistItems = [
    {
      id: 1,
      title: "MOSQUITO",
      subtitle: "A HUMAN HISTORY OF OUR",
      author: "Timothy C. Winegard",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "THINK AND GROW RICH",
      author: "Napoleon Hill",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "DON'T LET HER STAY",
      author: "Nicola Sanders",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="wishlist-container">
      <h1 className="page-title">BookStore</h1>
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <Link to="/" className="tab-link">Home</Link>
        <Link to="/books" className="tab-link">Books</Link>
        <Link to="/wishlist" className="tab-link active">Wishlist</Link>
        <Link to="/orders" className="tab-link">My orders</Link>
        <Link to="/logout" className="tab-link logout">Logout (adm)</Link>
      </div>

      <h2 className="section-title">Wishlist</h2>

      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-details">
              <h3 className="item-title">{item.title}</h3>
              {item.subtitle && <p className="item-subtitle">{item.subtitle}</p>}
              <p className="item-price">{item.price}</p>
            </div>
            <div className="item-actions">
              <button className="remove-btn">
                Remove from Wishlist
              </button>
              <button className="view-btn">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;