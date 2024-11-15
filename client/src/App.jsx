import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: "localhost:3000",
    timeout: 5000, // 5 seconds timeout
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchHello = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/hello");
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch hello message");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div className="container">
      {/* Hello World Message Display */}
      <div className="hello-section">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && <h2>{message}</h2>}
        <button onClick={fetchHello} className="fetch-button" disabled={loading}>
          {loading ? "Fetching..." : "Refresh Message"}
        </button>
      </div>
    </div>
  );
}

export default App;
