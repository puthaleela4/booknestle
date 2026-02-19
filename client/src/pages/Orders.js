
import React from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  // Sample orders data matching your screenshot
  const orders = [
    {
      id: "ORD-001",
      productName: "The Great Gatsby",
      orderId: "6540449015",
      address: "dskfsf, asdas, (fasda), asdasda.",
      seller: "syed",
      bookingDate: "18/12/2023",
      deliveryBy: "25/12/2023",
      price: "$199",
      status: "delivered",
      statusClass: "delivered"
    },
    {
      id: "ORD-002",
      productName: "1984",
      orderId: "6600f1d467",
      address: "122-8, hyderabad,(517994), Telangana.",
      seller: "syed",
      bookingDate: "25/3/2024",
      deliveryBy: "1/4/2024",
      price: "$229",
      status: "ontheway",
      statusClass: "ontheway"
    },
    {
      id: "ORD-003",
      productName: "To Kill a Mockingbird",
      orderId: "6600f25067",
      address: ", .(.)",
      seller: "syed",
      bookingDate: "25/3/2024",
      deliveryBy: "1/4/2024",
      price: "$229",
      status: "ontheway",
      statusClass: "ontheway"
    },
    {
      id: "ORD-004",
      productName: "Pride and Prejudice",
      orderId: "6600f25067",
      address: ", .(.)",
      seller: "syed",
      bookingDate: "25/3/2024",
      deliveryBy: "1/4/2024",
      price: "$229",
      status: "ontheway",
      statusClass: "ontheway"
    }
  ];

  return (
    <div className="orders-container">
      <h1 className="page-title">BookStore</h1>
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <Link to="/" className="tab-link">Home</Link>
        <Link to="/books" className="tab-link">Books</Link>
        <Link to="/wishlist" className="tab-link">Wishlist</Link>
        <Link to="/orders" className="tab-link active">My orders</Link>
        <Link to="/logout" className="tab-link logout">Logout (syd)</Link>
      </div>

      <h2 className="section-title">My Orders</h2>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ProductName</th>
              <th>OrderId</th>
              <th>Address</th>
              <th>Seller</th>
              <th>BookingDate</th>
              <th>Delivery By</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.productName}</td>
                <td>
                  <span className="order-id">{order.orderId}</span>
                </td>
                <td className="address-cell">{order.address}</td>
                <td>{order.seller}</td>
                <td>{order.bookingDate}</td>
                <td>{order.deliveryBy}</td>
                <td className="price-cell">{order.price}</td>
                <td>
                  <span className={`status-badge ${order.statusClass}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;