
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard", {
      headers: { Authorization: token }
    })
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>
      <p>Users: {data.users}</p>
      <p>Sellers: {data.sellers}</p>
      <p>Books: {data.books}</p>
      <p>Orders: {data.orders}</p>
    </div>
  );
}

export default Admin;
