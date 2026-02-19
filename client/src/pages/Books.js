
import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to fetch books');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchBooks}>Retry</button>
      </div>
    );
  }

  return (
    <div className="books-container">
      <h1 className="page-title">BookStore</h1>
      
      <div className="books-list">
        {books.map(book => (
          <div key={book._id} className="book-item">
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">
                <span className="label">Author:</span> {book.author}
              </p>
              {book.genre && (
                <p className="book-genre">
                  <span className="label">Genre:</span> {book.genre}
                </p>
              )}
              <p className="book-price">
                <span className="label">Price:</span> ${book.price}
              </p>
              {book.format && <p className="book-format">{book.format}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;