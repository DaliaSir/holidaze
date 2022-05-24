import * as yup from "yup";


export const contactValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter your full name").min(3, "Full name must be at least 3 characters"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
  subject: yup.string().required("Please enter the subject").min(3, "Subject must be at least 3 characters"),
  message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
});

export const addValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter the name of the place").min(3, "Name must be at least 3 characters"),
  address: yup.string().required("Please enter an address").min(10, "The address must be at least 10 characters"),
  price: yup.number().required("Please enter the price").positive("Value of price must be a positive number").integer(),
  guests: yup.number().required("Please enter the max number of guests").positive("Number of guests must be a positive number").integer().min(1),
  beds: yup.number().required("Please enter the number of beds").positive("Number of beds must be a positive number").integer().min(1),
  images: yup.mixed().test("numberOFmages", "Please select exactly 5 images", (value) => {
    return value && value.length === 5;
  }),
  is_featured: yup.boolean(),
  description: yup.string().required("Please enter the description").min(10, "The description must be at least 10 characters"),
  category: yup.string().required("Please select the category"),
});

export const bookValidationSchema = yup.object().shape({
  name: yup.string().required("Please enter your full name").min(3, "Full name must be at least 3 characters"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
  phone: yup.number().positive("Number of beds must be a positive number").integer(),
  guests: yup.string().required("Please enter number of guests staying").min(1, "At least 1 guest required"),
  check_in: yup.date().required("Please select check in date"),
  check_out: yup.date().required("Please select check out date"),
});

export const signinValidationSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});