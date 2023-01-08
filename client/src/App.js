import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormGroup,
  Input,
  Label,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Spinner,
  Table,
} from "reactstrap";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(null);
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
    setCategory(null);
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
      <h1 className="m-5">London City Guide</h1>
      <FormGroup className="form-group m-auto" row>
        <Label for="cities" sm={5}>
          Select a city
        </Label>
        <Col sm={7}>
          <Input id="cities" name="cities" type="select" onChange={selectCity}>
            <option value="-1">Select a city</option>
            <option value="stratford">Stratford</option>
            <option value="heathrow">Heathrow</option>
            <option value="harrow">Harrow</option>
          </Input>
        </Col>
      </FormGroup>

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
      {!cityData &&
        cityData.length <
          0(
            <Spinner className="m-5" color="primary">
              Loading...
            </Spinner>
          )}

      {category && (
        <Table bordered responsive className="table m-auto mt-4" size="sm">
          <thead>
            <tr className="table-primary">
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
        </Table>
      )}
    </div>
  );
}

export default App;
