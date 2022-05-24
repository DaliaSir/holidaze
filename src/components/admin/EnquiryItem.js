import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function EnquiryItem({ id, name, email, phone, guests, check_in, check_out }) {
  return (
    <Col sm={6} md={4} className="g-4" key={id}>
      <Card className="enquiry-card">
        <Card.Header>
          <div className="card-header__name">{name}</div>
          <div className="card-header__email">{email}</div>
        </Card.Header>
        <Card.Body >
          <div className="card-header__phone"> <span>Phone:</span> {phone}</div>
          <div className="card-header__guests"> <span>Guests:</span> {guests}</div>
          <div className="card-header__check">
            <div className="card-header__check--in"> <span>Check in:</span> {check_in}</div>
            <div className="card-header__check--out"> <span>Check out:</span> {check_out}</div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

EnquiryItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  guests: PropTypes.number.isRequired,
  check_in: PropTypes.string.isRequired,
  check_out: PropTypes.string.isRequired,
};

EnquiryItem.defaultProps = {
  name: "Anonymous"
}