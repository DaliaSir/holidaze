import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Accommodation({ id, name, image, price, guests, beds }) {

  return (
    <Col sm={6} lg={3} key={id}>
      <Link to={`/detail/${id}`}>
        <Card>
          <div className="card-img-top" style={{ backgroundImage: `url(${image})` }}></div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text className="card__price">
              {price} <span>NOK / night</span>
            </Card.Text>
            <Card.Text className="card__capacity-info">
              {guests} guests
              <span className="dot"></span>
              {beds} beds
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

Accommodation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

Accommodation.defaultProps = {
  name: "Accommodation"
}