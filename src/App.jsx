import "./App.css";
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();
    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;
    const res = await axios.get(API);
    setLocation(res.data[0]);
  }

  return (
    <>
      <h1>City Locator</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} placeholder="Location" />
        <button>Explore!</button>
      </form>

      <h2>{location.display_name}</h2>
      <p>
        latitude: {location.lat}, longitude: {location.lon}
      </p>
      <img
        src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}>&zoom=13&format=png`}
      />
    </>
  );
}

export default App;
