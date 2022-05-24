import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { contactValidationSchema } from "../utils/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, MESSAGE_PATH } from "../../constants/api";
import FormError from "../common/FormError";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const url = BASE_URL + MESSAGE_PATH;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setsubmittingError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(contactValidationSchema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setsubmittingError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setsubmittingError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  return (
    <Container className="contact-container__form">
      <p className="contact-container__form--success-message">
        {isSubmitSuccessful ? "Success! We will contact you within 24 hours." : ""}
      </p>
      <Form onSubmit={handleSubmit(onSubmit)} >
        {submittingError && <FormError>{submittingError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3 contact-container__form--form-group" >
            <Form.Label>Full Name</Form.Label>
            <input {...register("name")} className="form-control" placeholder="Your full name" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group className="mb-3 contact-container__form--form-group" >
            <Form.Label>Email</Form.Label>
            <input {...register("email")} className="form-control" placeholder="Your email address" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Form.Group>
          <Form.Group className="mb-3 contact-container__form--form-group" >
            <Form.Label>Subject</Form.Label>
            <input {...register("subject")} className="form-control" placeholder="Subject" />
            {errors.subject && <FormError>{errors.subject.message}</FormError>}
          </Form.Group>
          <Form.Group className="mb-3 contact-container__form--form-group" >
            <Form.Label>Message</Form.Label>
            <textarea rows={6} {...register("message")} className="form-control" placeholder="Your message" />
            {errors.message && <FormError>{errors.message.message}</FormError>}
          </Form.Group>
          <button type="submit" className="btn btn-primary">{submitting ? 'Sending...' : 'Send'}</button>
        </fieldset>
      </Form>
    </Container>
  );
}