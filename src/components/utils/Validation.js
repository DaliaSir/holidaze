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
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number must be a positive number")
    .integer("A phone number can't include a decimal point")
    .min(0, 'Min value is 0')
    .nullable()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value)),
  guests: yup.number().required("Please enter number of guests staying").typeError("The amount of guests must be a number").min(1, "At least 1 guest required").transform((value) => (isNaN(value) ? undefined : value)),
  check_in: yup
    .date("Please select a date")
    .required("Please select check in date")
    .typeError("Please select a date")
    .min(new Date(), "Check in date should not be earlier than today")
    .max(yup.ref("check_out"), "Check in date must be before check out date"),
  //.min("2022-07-01", "Date is too early")
  //.max(new Date()),
  check_out: yup
    .date("Please select a date")
    .required("Please select check out date")
    .typeError("Please select a date")
    .min(yup.ref("check_in"), "Check out date must be after check in date"),
});

export const signinValidationSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});