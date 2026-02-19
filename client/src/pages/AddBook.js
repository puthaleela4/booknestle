
import React, { useState } from "react";
import axios from "axios";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/books",
      form,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    alert("Book Added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Author" onChange={(e)=>setForm({...form,author:e.target.value})}/>
      <input placeholder="Genre" onChange={(e)=>setForm({...form,genre:e.target.value})}/>
      <input placeholder="Price" onChange={(e)=>setForm({...form,price:e.target.value})}/>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
