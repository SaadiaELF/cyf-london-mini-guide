import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, ButtonGroup } from "reactstrap";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  // const [selected, setSelected] = useState(null);

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
    <div className="App text-center">
      <h1>London City Guide</h1>
      <label htmlFor="cities">Choose a city:</label>
      <select id="cities" name="cities" onChange={selectCity}>
        <option value="-1">Select a city</option>
        <option value="stratford">Stratford</option>
        <option value="heathrow">Heathrow</option>
        <option value="harrow">Harrow</option>
      </select>

      {showMessage && (
        <Alert className="m-5 text-center" color="danger">
          You need to select a city first
        </Alert>
      )}
      <div>
        <ButtonGroup>
          <Button
            color="primary"
            outline
            value="pharmacies"
            onClick={selectCategory}
            active={category === "pharmacies"}
          >
            Pharmacies
          </Button>
          <Button
            color="primary"
            outline
            value="doctors"
            onClick={selectCategory}
            active={category === "doctors"}
          >
            Doctors
          </Button>
          <Button
            color="primary"
            outline
            value="hospitals"
            onClick={selectCategory}
            active={category === "hospitals"}
          >
            Hospitals
          </Button>
          <Button
            color="primary"
            outline
            value="colleges"
            onClick={selectCategory}
            active={category === "colleges"}
          >
            Colleges
          </Button>
        </ButtonGroup>
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
