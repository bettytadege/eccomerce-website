import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { instance } from "@/api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

function GoogleButton() {
  const provider=new GoogleAuthProvider()
  const navigate=useNavigate()
  const{setUserData,signUp}=useAuth()
   const handleGoogleButton=async()=>{
    try {
      const result=await signInWithPopup(auth,provider)
      console.log('result',result.user)
      const user=result.user
      const idToken=await user.getIdToken(true)
      console.log('idtoken',idToken)

    
      const response=await instance.post(`auth/google-signin`,{idToken})
      console.log('response',response)
      setUserData(response.data.user)
      const token=  response.data.token
      signUp(token)

      toast.success("Signed up successfully!")
      if(result.user){
        navigate('/')
      }

     
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <>
      <Button
      onClick={handleGoogleButton}
        size="lg"
        className="mt-6 flex h-12  items-center w-full bg-white text-black border border-black hover:bg-white"
      >
        <FcGoogle size={30} />

        <p className="flex-1">Continue with Google</p>
      </Button>
    </>
  );
}

export default GoogleButton;
