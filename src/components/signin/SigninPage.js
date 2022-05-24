import Heading from "../layout/Heading";
import SigninForm from "./SigninForm";

export default function SigninPage() {
  return (
    <div className="signin-container">
      <Heading content="Sign in" />
      <SigninForm />
    </div>
  );
}