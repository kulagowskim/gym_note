import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => setApiResponse(res));
  }

  useEffect(() => callAPI(), [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{apiResponse}</p>
      </header>
    </div>
  );
}

export default App;
