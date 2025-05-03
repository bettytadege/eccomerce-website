/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import ContinueButton from "../common/ContinueButton";
import SectionDivider from "../common/SectionDivider";
import GoogleButton from "../common/GoogleButton";
import { Input } from "../ui/input";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import useFormValidation from "../hooks/useFormValidation";
import { useAuth } from "../context/AuthContext";
import { instance } from "@/api/axiosInstance";

function Signup() {
 
  const{  error,
    setError,
    errorPass,
    setErrorPass,
    email,
    setEmail,
    validatePassword,
    validateEmail,
    password,setPassword}=useFormValidation()
  const [isLoading, setIsLoading] = useState(false);
    const{signUp}=useAuth()
  const navigate = useNavigate();


  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setErrorPass("");
    setIsLoading(true);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(getAuth(), email, password);
      const user = result.user;
      const idToken = await user.getIdToken(true);
      const response = await instance.post("auth/signup", { idToken });
      const token=  response.data.token
      signUp(token)

      toast.success("Signed up successfully!")
      
      if (result.user) {
        navigate("/");
      }
    } catch (error:any) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please sign in.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format");
     
      } else if (error.code === "auth/network-request-failed") {
       
        toast.error("network error, please try again!")}
        else {
          toast.error("An error occurred, please try again!")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#F5F5F5] w-full min-h-screen">
      <div className="bg-white w-[566px] h-[600px] rounded-lg">
        <div className="text-center text-2xl pt-5 font-semibold">
          <h1>Sign Up</h1>
        </div>
   <div className="space-y-7 p-10">
        <form className="space-y-7 " onSubmit={handleSignUp}>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={`focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`focus:ring-2 ${errorPass ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
            />
            {errorPass && <div className="text-red-500 text-sm">{errorPass}</div>}
          </div>
          <div className="space-y-6">
            {isLoading ? (
              <button
                disabled={isLoading}
                className="w-full rounded-md h-12 font-semibold text-white flex gap-3 items-center justify-center cursor-not-allowed bg-blue-400"
              >
                <ImSpinner2 className="w-5 h-5 animate-spin" />
                Processing...
              </button>
            ) : (
              <ContinueButton />
            )}
            
          </div>

        </form>
        <SectionDivider />
            <GoogleButton />
          <div className="float-end">
            Have an account?{" "}
            <Link to="/signin" className="hover:underline">
              Login
            </Link>
          </div></div>
      </div>
    </div>
  );
}

export default Signup;