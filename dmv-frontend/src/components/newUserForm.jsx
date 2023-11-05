import React, { useState } from "react";
import "./css/newUserForm.css";
import { useClientContext } from "../context/clientContext";

function NewUserForm() {
  const { addClient } = useClientContext();
  const { client } = useClientContext();
  const { emailError } = useClientContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addClient({ name, email, address, phone });
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="new-user-form">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        placeholder="Address"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="000-000-0000"
        required
      />
      <button type="submit">Submit</button>

      {emailError && (
        <p
          style={{
            color: "red",
          }}
        >
          Email already exists
        </p>
      )}

      {client && (
        <p
          style={{
            color: "green",
          }}
        >
          ✅ Client added successfully!
        </p>
      )}
    </form>
  );
}

export default NewUserForm;
