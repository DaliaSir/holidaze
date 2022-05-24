import { useNavigate } from "react-router-dom";
import hotelsImage from "../../images/category-h-christopher-jolly.jpg";
import bbImage from "../../images/category-bb-brooke-lark.jpg";
import ghImage from "../../images/category-gh-clarisse-meyer.jpg";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function CategoryLinks() {

  const navigate = useNavigate();

  return (
    <Container className="category-container__links">
      <div className="category-container__links--link" style={{ backgroundImage: `url(${hotelsImage})` }}>
        <Button onClick={() => navigate("/accommodations/hotels")}>Hotels</Button>
      </div>
      <div className="category-container__links--link" style={{ backgroundImage: `url(${bbImage})` }}>
        <Button onClick={() => navigate("/accommodations/bed-and-breakfast")}>Bed and Breakfast</Button>
      </div>
      <div className="category-container__links--link" style={{ backgroundImage: `url(${ghImage})` }}>
        <Button onClick={() => navigate("/accommodations/guest-houses")}>Guest Houses</Button>
      </div>
    </Container>
  );
}