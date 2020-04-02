import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { getFavorites, getWeather } from "../../services/service";
import SingleFavorite from "../SingleFavorite/SingleFavorite";

class SearchBlock extends Component {
  state = {
    name: "",
    cities: [],
    selectedCity: null,
    cityWeather: null
  };

  componentDidMount() {}

  onChangeHandler = name => {
    let nameArr = name.split(", ");
    if (nameArr.length === 2) {
      const city = nameArr[0];
      const country = nameArr[1];
      let selectedCity = this.state.cities.filter(
        el => el.name === city && el.country === country
      )[0];
      this.setState({ selectedCity, name });
    } else {
      if (name.length >= 2) {
        axios
          .get(
            `http://localhost:3001/cities?name_like=^${name}[a-zA-z%20+?]?&_limit=10`
          )
          .then(resp => this.setState({ cities: resp.data }));
      }
      this.setState({
        name,
        selectedCity: null
      });
    }
  };
  onSearch = () => {
    if (this.state.selectedCity) {
      const id = this.state.selectedCity.id;
      getWeather(id).then(cityWeather => {
        this.setState({ cityWeather });
      });
    }
  };
  addToFavorite = id => {
    const userId = localStorage.getItem("userId");
    getFavorites().then(data => {
      if (data.length) {
        let cities = data[0].cities;
        const dbId = data[0].id;
        if (cities.indexOf(id) === -1) {
          cities.push(id);
          axios.patch(`http://localhost:3001/user_cities/${dbId}`, {
            userId,
            cities
          });
        }
      } else {
        axios.post(`http://localhost:3001/user_cities`, {
          userId,
          cities: [id]
        });
      }
    });
  };
  render() {
    let renderList = null;
    if (this.state.cityWeather) {
      const cityWeather = this.state.cityWeather;
      renderList = (
        <SingleFavorite
          onClickHandler={this.addToFavorite}
          cityWeather={cityWeather}
        />
      );
    }
    let datalist = null;
    if (this.state.name.length >= 2 && this.state.cities.length) {
      datalist = (
        <datalist id="cities">
          {this.state.cities.map((city, i) => {
            return (
              <option
                key={city.id}
                id={city.id}
                value={city.name + ", " + city.country}
              />
            );
          })}
        </datalist>
      );
    }
    return (
      <Container>
        <Row className="pt-5">
          <Col sm={4}>
            <h2>Weather</h2>
          </Col>
          <Col sm={8} className="d-flex">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter City"
              list="cities"
              value={this.state.name}
              onChange={e => this.onChangeHandler(e.target.value)}
            />
            {datalist}
            <Button variant="outline-primary" onClick={() => this.onSearch()}>
              SEARCH
            </Button>
          </Col>
        </Row>
        <Row>{renderList}</Row>
      </Container>
    );
  }
}

export default SearchBlock;
