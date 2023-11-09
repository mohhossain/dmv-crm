import React from "react";
import "./css/forms.css";

function NewServiceForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    fetch("http://localhost:5555/api/services", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: event.target.name.value,
        price: parseFloat(event.target.price.value),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>Add New Service</h1>
      <form onSubmit={handleSubmit} className="service-form">
        <input type="text" name="name" id="name" placeholder="Service Name" />
        <input type="text" name="price" id="price" placeholder="Price" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default NewServiceForm;
