import React from "react";
import { Container, Col, Row, Button, ListGroup } from "react-bootstrap";
import { getWeather } from "../../services/service";

class SingleFavorite extends React.Component {
  state = {
    cityWeather: null
  };
  componentDidMount() {
    if (!this.state.cityWeather && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.getWeather(id);
      this.intervalId = setInterval(() => {
        this.getWeather(id);
      }, 3600);
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  getWeather = id => {
    getWeather(id).then(cityWeather => this.setState({ cityWeather }));
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cityWeather) {
      return {
        cityWeather: nextProps.cityWeather
      };
    }
    return null;
  }
  render() {
    let content = null;
    let cityWeather = this.state.cityWeather;
    if (cityWeather) {
      content = (
        <Col>
          <div>
            <p>City: {cityWeather.city.name}</p>
            <p>Country: {cityWeather.city.country}</p>
            <p>
              Sunrise{new Date(cityWeather.city.sunrise).toLocaleTimeString()}
            </p>
            <p>
              Sunset{new Date(cityWeather.city.sunset).toLocaleTimeString()}
            </p>
            {this.props.onClickHandler ? (
              <Button
                onClick={() => this.props.onClickHandler(+cityWeather.city.id)}
              >
                Add To Favorite
              </Button>
            ) : null}
          </div>
          <ul className="pt-5">
            {cityWeather.list.map((el, ind) => {
              return (
                <ListGroup horizontal={"sm"} key={ind}>
                  <ListGroup.Item>
                    <span>temp: {el.main.temp};</span>
                    <span>feels_like: {el.main.feels_like};</span>
                    <span>temp_min: {el.main.temp_min};</span>
                    <span>temp_max: {el.main.temp_max};</span>
                    <span>pressure: {el.main.tpressureemp};</span>
                    <span>sea_level: {el.main.sea_level};</span>
                    <span>grnd_level: {el.main.grnd_level};</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>weather main: {el.weather[0].main};</span>
                    <span>
                      weather description: {el.weather[0].description};
                    </span>
                    <span>icon: {el.weather[0].icon};</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>win speed: {el.wind.speed};</span>
                    <span>win deg: {el.wind.deg};</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span>dt_txt: {el.dt_txt};</span>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </ul>
        </Col>
      );
    }
    return (
      <Container>
        <Row>{content}</Row>
      </Container>
    );
  }
}

export default SingleFavorite;
