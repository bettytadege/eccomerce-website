
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ForgotPassword() {
    const navigate=useNavigate()
  return (
    <>
      <div className="flex justify-center items-center w-full min-h-screen bg-[#F5F5F5]  ">
        <div className="bg-white  w-[566px] h-[500px] rounded-lg">
        <div className="text-center  pt-12 text-2xl font-semibold">
            <h1>Forgot Your Password?</h1>
          </div>
          <div className="space-y-8 p-10 ">
            {/* <label htmlFor="">Enter your Email</label> */}
            <Input type="email" placeholder="Enter your Email" />
            <Button
            onClick={()=>{navigate('/confirmotp')}}
              className="w-full bg-[#1689FE]  h-12 font-semibold text-white hover:bg-[#168afee5]"
              
            >
              Send
            </Button>
            <Link to='/signin' 
            className="text-gray-700 flex items-center justify-center gap-2">
               <BiLeftArrowAlt/> 
            Back to Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
