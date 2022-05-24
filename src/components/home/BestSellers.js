import { useState, useEffect } from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import Accommodation from "../accommodations/Accommodation";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function BestSellers() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;
  document.title = `Holidaze | Home`;

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
  }, [url]);

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

  return (
    <Row className="best-sellers-container container">
      {accommodations.map((accommodation) => {
        const { id, name, images, price, guests, beds, is_featured } = accommodation;
        let imageUrl = 'https://images.unsplash.com/photo-1612437118782-84bb46a5c95a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80';
        if (images.length > 0) {
          imageUrl = images[0].url;
        }
        if (is_featured) {
          return <Accommodation key={id} id={id} name={name} image={imageUrl} price={price} guests={guests} beds={beds} />
        } else {
          return error;
        }
      })}
    </Row>
  );
}
