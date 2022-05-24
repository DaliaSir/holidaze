import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import Heading from "../layout/Heading";
import Accommodation from "./Accommodation";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function BedBreakfast() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;
  document.title = `Holidaze | Accommodations | Bed & Breakfast`;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setAccommodations(json);
        } else {
          setError("An error occurred");
        }

      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchAccommodations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner animation="border" />
      </div >
    );
  }

  if (error) {
    return <Alert variant="danger">An error occurred: {error}</Alert>;
  }

  const filteredHotels = accommodations.filter((hotel) => {
    if (hotel.category === "bed and breakfast") {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="category-page">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/accommodations")}>Accommodations</Breadcrumb.Item>
        <Breadcrumb.Item active>Bed and Breakfast</Breadcrumb.Item>
      </Breadcrumb>
      <Heading content="Bed and Breakfast" />
      <Row className="accommodations-category-container container">
        {filteredHotels.map((accommodation) => {
          const { id, name, images, price, guests, beds } = accommodation;
          let imageUrl = 'https://images.unsplash.com/photo-1612437118782-84bb46a5c95a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80';
          if (images.length > 0) {
            imageUrl = images[0].url;
          }
          return <Accommodation key={id} id={id} name={name} image={imageUrl} price={price} guests={guests} beds={beds} />
        })}
      </Row>
    </div>
  );
}
