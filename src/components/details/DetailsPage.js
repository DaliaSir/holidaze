import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, ENQUIRY_PATH } from "../../constants/api";
import { bookValidationSchema } from "../utils/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../layout/Heading";
import emptyImage from "../../images/empty-image.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import FormError from "../common/FormError";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function DetailsPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImageShow, setModalImageShow] = useState(false);
  const [modalBookShow, setModalBookShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setsubmittingError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(bookValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      check_in: "",
      check_out: ""
    }
  });

  let { id } = useParams();
  const navigate = useNavigate();

  const url = BASE_URL + `accommodations/${id}`;
  const urlEnquiries = BASE_URL + ENQUIRY_PATH;
  document.title = `Holidaze | ${product.name}`;

  useEffect(function () {
    async function getData() {
      try {
        const response = await axios.get(url);
        console.log("response", response);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  if (loading) return (
    <div className="d-flex justify-content-center m-5">
      <Spinner animation="border" />
    </div >
  );

  if (error) return <Alert variant="danger">An error occurred: {error}</Alert>;

  function ImageModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="details-modal-view">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body >
          <Carousel variant="dark" className="details-carousel">
            {product.images.map(img => {
              let imageUrl = emptyImage;
              if (product.images.length > 0) {
                imageUrl = img.url;
              }
              return (
                <Carousel.Item key={img.id}>
                  <img className="d-block w-100" src={imageUrl} alt={product.name} />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  async function onSubmit(data) {
    setSubmitting(true);
    setsubmittingError(null);
    try {
      const response = await axios.post(urlEnquiries, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setsubmittingError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  function BookModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered animation className="enquiry-modal" >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book {product.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="enquiry-modal__form">
            <p className="enquiry-modal__form--success-message">
              {isSubmitSuccessful ? "Success! Your booking is sent." : ""}
            </p>
            <Form onSubmit={handleSubmit(onSubmit)} >
              {submittingError && <FormError>{submittingError}</FormError>}
              <fieldset disabled={submitting}>
                <Form.Group className="mb-3 enquiry-modal__form--form-group" >
                  <Form.Label>Full Name &#42;</Form.Label>
                  <input {...register("name")} className="form-control" placeholder="Your full name" />
                  {errors.name && <FormError>{errors.name.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 enquiry-modal__form--form-group" >
                  <Form.Label>Email  &#42;</Form.Label>
                  <input {...register("email")} className="form-control" placeholder="Your email address" />
                  {errors.email && <FormError>{errors.email.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 enquiry-modal__form--form-group" >
                  <Form.Label>Phone &#40;Enter your country code if not from Norway&#41;</Form.Label>
                  <input {...register("phone")} className="form-control" placeholder="Your phone number" />
                  {errors.phone && <FormError>{errors.phone.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 enquiry-modal__form--form-group" >
                  <Form.Label>Guests  &#42;</Form.Label>
                  <input {...register("guests")} className="form-control" placeholder="Number of guests" />
                  {errors.guests && <FormError>{errors.guests.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 enquiry-modal__form--form-group enquiry-modal__form--check" >
                  <Form.Label>Check in  &#42; &nbsp; &nbsp;</Form.Label>
                  <input {...register("check_in")} type="date" />
                  {errors.check_in && <FormError>{errors.check_in.message}</FormError>}
                </Form.Group>
                <Form.Group className="mb-3 enquiry-modal__form--form-group enquiry-modal__form--check" >
                  <Form.Label>Check out  &#42;</Form.Label>
                  <input {...register("check_out")} type="date" />
                  {errors.check_out && <FormError>{errors.check_out.message}</FormError>}
                </Form.Group>
                <hr />
                <p> &#42; Required fields</p>
                <Button className="enquiry-modal__form--btn-close" onClick={props.onHide}>Close</Button>
                <Button type="submit">{submitting ? 'Booking...' : 'Book'}</Button>
              </fieldset>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="details-container container">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/accommodations")}>Accommodations</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Heading content={product.name} />
      <Row className="details-container__image-container">
        {product.images.map((img) => {
          let imageUrl = emptyImage;
          if (product.images.length > 0) {
            imageUrl = img.url;
          }
          return <Col className="details-container__image col-12 col-sm-6 col-md-3 col-lg-2" key={img.id} style={{ backgroundImage: `url(${imageUrl})` }}></Col>
        })}
        <Button className="details-container__btn-view" onClick={() => setModalImageShow(true)}>
          View images
        </Button>
        <ImageModal show={modalImageShow} onHide={() => setModalImageShow(false)} />
      </Row>
      <Row className="details-container__info">
        <p className="details-container__info--price">{product.price} <span>NOK / per night</span></p>
        <div className="details-container__info--capacity">
          <p><i className="fas fa-user-friends"></i>  <span>Guests</span> {product.guests}</p>
          <div className="dot"></div>
          <p><i className="fas fa-bed"></i> <span>Beds</span> {product.beds}</p>
        </div>
        <p className="details-container__info--address">{product.address}</p>
        <p className="details-container__info--description">{product.description}</p>
      </Row>
      <Button className="details-container__btn-book" onClick={() => setModalBookShow(true)}>
        Book
      </Button>
      <BookModal show={modalBookShow} onHide={() => setModalBookShow(false)} />
    </div>
  );
}
