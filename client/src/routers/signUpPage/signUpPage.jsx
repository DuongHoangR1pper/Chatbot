import React from "react";
import { SignUp } from "@clerk/clerk-react";
import "./signUpPage.scss";
export default function SignUpPage() {
  return (
    <div className="signUpPage">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
