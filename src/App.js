import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <nav>
        <div className="brand">Abdulwasse</div>
        <button className="button" onClick={fetchData}>
          Get Users
        </button>
      </nav>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && (
        <div className="user-grid">
          {data.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} />
              <h1>
                {user.first_name} {user.last_name}
              </h1>
              <h2>{user.email}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
