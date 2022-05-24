import Heading from "./Heading";
import { Link } from "react-router-dom";
import smallLogo from "../../images/logo-white.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <footer>
      <Row className="footer-container">
        <Col className="footer-container__list">
          <Heading content="More info" size="6" />
          <Link className="footer-container__list--item" to="/accommodations">Accommodations</Link>
          <div className="footer-container__list--item">FAQ</div>
          <div className="footer-container__list--item">Terms and Conditions</div>
          <div className="footer-container__list--item">Your booking</div>
          <Link className="footer-container__list--item" to="/contact">Contact</Link>
        </Col>
        <Col className="footer-container__list">
          <Heading content="Useful Links" size="6" />
          <div className="footer-container__list--item">Bergen Tourist Center</div>
          <div className="footer-container__list--item">Rent a car</div>
          <div className="footer-container__list--item">What's on</div>
          <div className="footer-container__list--item">Bergen weather</div>
        </Col>
        <Col className="footer-container__list">
          <img src={smallLogo} alt=" Small logo Holidaze" />
        </Col>
        <Col className="footer-container__list">
          <Heading content="Our Office" size="6" />
          <div className="footer-container__list--address">
            Krinkelkroken 1 <br />
            5014 Bergen
          </div>
          <div className="footer-container__list--tlf">tlf (+47) 912 34 567</div>
        </Col>
        <Col className="footer-container__list">
          <Heading content="Follow" size="6" />
          <div className="footer-container__list--icons">
            <div className="footer-container__list--item footer-container__list--icon">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="footer-container__list--item footer-container__list--icon">
              <i className="fab fa-facebook"></i>
            </div>
            <div className="footer-container__list--item footer-container__list--icon">
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
        </Col>
      </Row>
      <div className="footer-copy">Copyright © Holidaze 2022</div>
    </footer>
  )
};
