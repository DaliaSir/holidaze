import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signinValidationSchema } from "../utils/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const url = BASE_URL + TOKEN_PATH;

export default function SigninForm() {
  const [submitting, setSubmitting] = useState(false);
  const [signinError, setSigninError] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signinValidationSchema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setSigninError(null);
    try {
      const response = await axios.post(url, {
        identifier: data.username.toLowerCase(),
        password: data.password,
      });
      setAuth(response.data);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setSigninError("Username or password is incorrect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="signin-container__form">
      <Form onSubmit={handleSubmit(onSubmit)} >
        {signinError && <FormError>{signinError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" >
            <Form.Label>Username</Form.Label>
            <input {...register("username")} className="form-control" placeholder="Your username" />
            {errors.username && <FormError>{errors.username.message}</FormError>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <input {...register("password")} className="form-control" placeholder="Your password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </Form.Group>
          <button type="submit" className="btn btn-primary" >{submitting ? "Signing in..." : "Sign in"}</button>
        </fieldset>
      </Form>
    </Container>
  );
}
