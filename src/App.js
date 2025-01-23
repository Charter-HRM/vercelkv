import React, { useState } from 'react';

const App = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [retrievedValue, setRetrievedValue] = useState('');
  const [status, setStatus] = useState('');

  const handleSetValue = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_VERCEL_KV_API_URL}/set/${key}/${value}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VERCEL_KV_API_KEY}`,
        },
      });

      if (response.ok) {
        setStatus('Value set successfully!');
      } else {
        const errorData = await response.json();
        setStatus(`Failed to set value: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error setting value:', error);
      setStatus('Error occurred while setting value.');
    }
  };

  const handleGetValue = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_VERCEL_KV_API_URL}/get/${key}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VERCEL_KV_API_KEY}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setRetrievedValue(result.result || 'Key does not exist.');
        setStatus('');
      } else {
        const errorData = await response.json();
        setStatus(`Failed to get value: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error retrieving value:', error);
      setStatus('Error occurred while retrieving value.');
    }
  };

  return (
    <div>
      <h1>Upstash Redis Demo</h1>
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
      <button onClick={handleSetValue}>Set Value in Redis</button>
      <button onClick={handleGetValue}>Get Value from Redis</button>
      <p>{status}</p>
      {retrievedValue && <p>Retrieved Value: {retrievedValue}</p>}
    </div>
  );
};

export default App;
