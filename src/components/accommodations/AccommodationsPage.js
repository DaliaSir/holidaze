import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import Heading from "../layout/Heading";
import Accommodation from "./Accommodation";
import emptyImage from "../../images/empty-image.png"
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;
  document.title = `Holidaze | Accommodations`;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccommodations() {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setAccommodations(json.data);
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

  function handleChange(value) {
    navigate(`/accommodations/${value}`);
  }

  return (
    <div className="accommodations-page">
      <Heading content="Accommodations" />
      <Form>
        <Form.Select onChange={e => handleChange(e.target.value)}>
          <option value="">All accommodations</option>
          <option value="bed-and-breakfast">Bed and Breakfast</option>
          <option value="guest-houses">Guest Houses</option>
          <option value="hotels">Hotels</option>
        </Form.Select>
      </Form>
      <Row className="accommodations-container container">
        {accommodations.map((accommodation) => {
          const { id, attributes: { name, images, price, guests, beds } } = accommodation;
          let imageUrl = emptyImage;
          if (images.data.length > 0) {
            imageUrl = images.data[0].attributes.url;
          }
          return <Accommodation key={id} id={id} name={name} image={imageUrl} price={price} guests={guests} beds={beds} />
        })}
      </Row>
    </div>
  );
  // return (
  //   <div className="accommodations-page">
  //     <Heading content="Accommodations" />
  //     <Form>
  //       <Form.Select onChange={e => handleChange(e.target.value)}>
  //         <option value="">All accommodations</option>
  //         <option value="bed-and-breakfast">Bed and Breakfast</option>
  //         <option value="guest-houses">Guest Houses</option>
  //         <option value="hotels">Hotels</option>
  //       </Form.Select>
  //     </Form>
  //     <Row className="accommodations-container container">
  //       {accommodations.map((accommodation) => {
  //         let imageUrl = emptyImage;
  //         if (accommodation.attributes.images.data.length > 0) {
  //           imageUrl = accommodation.attributes.images.data[0].attributes.url;
  //         }
  //         return <Accommodation key={accommodation.id} id={accommodation.id} name={accommodation.attributes.name} image={imageUrl} price={accommodation.attributes.price} guests={accommodation.attributes.guests} beds={accommodation.attributes.beds} />
  //       })}
  //     </Row>
  //   </div>
  // );
}
