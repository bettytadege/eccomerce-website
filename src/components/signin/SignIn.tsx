/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import ContinueButton from "../common/ContinueButton";
import SectionDivider from "../common/SectionDivider";
import GoogleButton from "../common/GoogleButton";
import { Input } from "../ui/input";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import useFormValidation from "../hooks/useFormValidation";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
import { instance } from "@/api/axiosInstance";

function SignIn() {
  const {
    setError,
    error,
    errorPass,
    setErrorPass,
    email,
    setEmail,
    validatePassword,
    validateEmail,
    password,
    setPassword,
  } = useFormValidation();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth(); 

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setErrorPass("");
    setIsLoading(true);

    localStorage.removeItem("token"); 

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }
    if (!isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const idToken = await user.getIdToken(true);

      const response = await instance.post(`auth/signin`, {
        idToken,
      });

      if (response.status === 404 || response.data.statusCode === 404) {
        toast.error("No user is found with this email, please register first");
        setIsLoading(false);
        return;
      }

      const { token } = response.data; 
      await signIn(token); 

      toast.success("Signed in successfully!");
      navigate("/"); 
    } catch (error: any) {
      console.error("Sign-in error:", error);

      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.response?.status === 404) {
        toast.error("No user is found with this email, please register first");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("Login error, please try again!")
      } else {
        toast.error("Login error, please try again!")
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#F5F5F5] w-full min-h-screen">
      <div className="bg-white border sm:w-[566px] sm:h-[620px] rounded-lg w-[350px] h-[600px]">
        <div className="text-center pt-5 text-2xl font-semibold">
          <h1>Sign In</h1>
        </div>
        <div className="space-y-7 p-10">
          <form className="space-y-7" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
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
                className={`focus:ring-2 ${
                  errorPass
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errorPass && (
                <div className="text-red-500 text-sm">{errorPass}</div>
              )}
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
        </div>
        <div className="float-end px-8">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline">
            signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;