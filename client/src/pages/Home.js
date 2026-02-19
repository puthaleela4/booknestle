
import React from 'react';
import './Home.css';

const Home = () => {
  const bestSellers = [
    {
      id: 1,
      title: "THINK AND GROW RICH",
      year: "MCMXXXVII",
      author: "Nigel Rees",
      location: "New York, NY",
      price: "$25.00",
      format: "Hardcover",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "DON'T LET HER STAY",
      author: "NICOLA SANDERS",
      price: "$25.00",
      format: "Paperback",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "BILL O'REILLY",
      subtitle: "A POEM BY KILLING THE WITCHES",
      price: "$25.00",
      format: "Hardcover",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="home-container">
      <h1 className="page-title">BookStore</h1>
      
      <section className="best-seller-section">
        <h2 className="section-title">Best Seller</h2>
        
        <div className="books-list">
          {bestSellers.map(book => (
            <div key={book.id} className="book-item">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                {book.year && <p className="book-year">{book.year}</p>}
                {book.author && <p className="book-author">{book.author}</p>}
                {book.location && <p className="book-location">{book.location}</p>}
                {book.subtitle && <p className="book-subtitle">{book.subtitle}</p>}
                <p className="book-price">{book.price}</p>
                <p className="book-format">{book.format}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;