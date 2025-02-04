import React from "react";
import { SignIn, useSignIn } from '@clerk/clerk-react'
import "./signInPage.scss"


export default function SignInPage() {
  return(
    <div className="signInPage">
        <SignIn path="/sign-in" signUpUrl="/sign-up"/>
    </div>
  )
}