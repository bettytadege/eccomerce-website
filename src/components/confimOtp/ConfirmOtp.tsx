
import { useRef,  } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function ConfirmOtp() {
  const navigate=useNavigate()
    const inputsRef = useRef<HTMLInputElement[]>([]);
    // const[otp,setOtp]=useState()

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, ""); 
      e.target.value = value;
  
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus(); 
      }
    };
  
    const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
        inputsRef.current[index - 1]?.focus(); 
      }
    }
    
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#F5F5F5] ">
      <div className="bg-white border  w-[566px] h-[500px] rounded-lg">
        <div className="text-center pt-10 text-2xl font-semibold">
          <h1>Verify Code</h1>
        </div>
        <div className="space-y-7 p-10">
          <p className="text-gray-600 text-center">We have sent the verification code to your email address.</p>
           <div className="flex gap-6 justify-center">
            {[...Array(6)].map((_, index) => (
              <input
              
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                className="w-10 h-10 bg-transparent text-center placeholder:text-slate-400 text-slate-700 text-lg border border-black rounded-md transition duration-300 ease focus:outline focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <Button   onClick={()=>{navigate('/changepassword')}} className="w-full bg-[#1689FE] normal-case text-sm h-12 font-semibold text-white hover:bg-[#168afee2]"  >
            Verify
          </Button>
          <div className="float-right">
            Didn't get the code? <a href="#" className="hover:underline">Resend code</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOtp;
