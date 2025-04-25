import { useState } from "react";

function useFormValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const validateEmail = (email: string) => {
    if (!email || email.trim() === "") {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email");
      return false;
    }
    setError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setErrorPass("Password is required");
      return false;
    }
    if (password.length < 6) {
      setErrorPass("Password must be at least 6 characters long");
      return false;
    }
    setErrorPass("");
    return true;
  };
  return {
    error,
    setError,
    errorPass,
    setErrorPass,
    email,
    setEmail,
    validatePassword,
    validateEmail,
    password,setPassword
  };
}

export default useFormValidation;
