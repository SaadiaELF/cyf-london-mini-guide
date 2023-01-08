import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [cityData, setCityData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    city &&
      category &&
      fetch(`/${city}/${category}`)
        .then((res) => res.json())
        .then((data) => setCityData(data));
  }, [city, category]);

  function selectCity(e) {
    setShowMessage(false);
    setCity(e.target.value.toLowerCase());
  }

  function selectCategory(e) {
    if (city) {
      setShowMessage(false);
      setCategory(e.target.value.toLowerCase());
    } else {
      setCategory("");
      setShowMessage(true);
    }
  }

  return (
    <div className="App">
      <h1>London City Guide</h1>
      <label htmlFor="cities">Choose a city:</label>
      <select id="cities" name="cities" onChange={selectCity}>
        <option value="-1">Select a city</option>
        <option value="stratford">Stratford</option>
        <option value="heathrow">Heathrow</option>
        <option value="harrow">Harrow</option>
      </select>
      {showMessage && <div>Please select a city first</div>}
      <div>
        <button type="button" value="pharmacies" onClick={selectCategory}>
          Pharmacies
        </button>
        <button type="button" value="doctors" onClick={selectCategory}>
          Doctors
        </button>
        <button type="button" value="hospitals" onClick={selectCategory}>
          Hospitals
        </button>
        <button type="button" value="colleges" onClick={selectCategory}>
          Colleges
        </button>
      </div>
      <h2>Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {cityData &&
            cityData.length > 0 &&
            cityData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.website}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
