import Heading from "../layout/Heading";
import { useState, useEffect } from "react";
import { BASE_URL, ENQUIRY_PATH } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import EnquiryItem from "./EnquiryItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function AdminEnquiresPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ENQUIRY_PATH;
  document.title = `Holidaze | Admin | Enquires`;
  const http = useAxios();

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setEnquiries(response.data);
      } catch (error) {
        console.log(error);
        setError("An error occurred:" + error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();

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
    <div className="enquiries-container">
      <Heading content="Enquires" />
      <Container>
        <Row>
          {enquiries.map((enquiryItem) => {
            const { id, name, email, phone, guests, check_in, check_out } = enquiryItem;
            return <EnquiryItem key={id} id={id} name={name} email={email} phone={phone} guests={guests} check_in={check_in} check_out={check_out} />
          })}
        </Row>
      </Container>
    </div>
  );
}

