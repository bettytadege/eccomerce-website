
import { Button } from "../ui/button";
type ContinueButtonProps={
  onClick?:()=>void
}

function ContinueButton({onClick}:ContinueButtonProps) {

  return (
    <>
      <Button type="submit" onClick={onClick} className="w-full bg-[#1689FE]  text h-12 font-semibold text-white hover:bg-[#168afee5]">
        Continue
      </Button>
    </>
  );
}

export default ContinueButton;
