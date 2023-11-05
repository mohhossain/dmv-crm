import { createContext, useContext, useState } from "react";

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [emailError, setEmailError] = useState(false);

  const getClients = async () => {
    const response = await fetch("http://localhost:5555/api/clients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setClients(data);
      setEmailError(false);
    }

    return clients;
  };

  const addClient = async (client) => {
    try {
      const response = await fetch("http://localhost:5555/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(client),
      });
      if (response.status === 201) {
        const data = await response.json();
        // look for 400 error
        // if 400 error, display error message

        setClients([...clients, data]);
        setClient(data);
      } else {
        setEmailError(true);
      }
    } catch (error) {
      console.error(error);
    }
    return clients;
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        client,
        emailError,
        getClients,
        addClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
