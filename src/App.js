import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");

  const handleSet = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_VERCEL_KV_API_URL}/kv/${key}`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_VERCEL_KV_API_KEY}`,
          },
        }
      );
      alert("Key-Value pair saved!");
    } catch (error) {
      console.error("Error setting value:", error);
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VERCEL_KV_API_URL}/kv/${key}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_VERCEL_KV_API_KEY}`,
          },
        }
      );
      setRetrievedValue(response.data.value);
    } catch (error) {
      console.error("Error retrieving value:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Vercel KV Demo</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSet}>Set Key-Value</button>
        <button onClick={handleGet}>Get Value</button>
      </div>
      {retrievedValue && <p>Retrieved Value: {retrievedValue}</p>}
    </div>
  );
};

export default App;
