import React from "react";
import { getFavorites, getCity } from "../../services/service";
import { Link } from "react-router-dom";
import { ListGroup, Container, Row, Col } from "react-bootstrap";

class Favorites extends React.Component {
  state = {
    cities: []
  };
  componentDidMount() {
    getFavorites().then(data => {
      if (data[0]) {
        data[0].cities.forEach(element => {
          getCity(element).then(city => {
            let cities = [...this.state.cities];
            cities.push(city);
            this.setState({ cities });
          });
        });
      }
    });
  }
  render() {
    let cities = this.state.cities;
    let renderFavList = null;
    if (cities.length) {
      renderFavList = (
        <ListGroup horizontal style={{ flexWrap: "wrap" }}>
          {cities.map((el, ind) => (
            <ListGroup.Item
              as={Link}
              action
              to={`/favorites/${el.id}`}
              key={ind}
              style={{ width: "25%", marginTop: "20px" }}
            >
              {el.name} , {el.country}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }} className="pt-5 pb-5">
              Favorites
            </h1>
            {renderFavList}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Favorites;
