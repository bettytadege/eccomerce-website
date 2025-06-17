
import { Button } from "../ui/button";
 type SummaryProps={
  icon?:React.ReactNode,
  name:string,
  onClick:()=>void,
  item:number,
  subTotal:number,
 }
function Summary({name,onClick,icon,item,subTotal}:SummaryProps) {
 
  return (
    <div className="bg-white  lg:w-[35%] md:w-[45%] w-full h-fit p-7 rounded-md space-y-6">
      <h1 className="font-semibold text-xl">{`Summary (${item} items)`}</h1>
      <div className="flex justify-between">
        <p>Total</p>
       <span className="font-semibold text-lg">ETB {subTotal.toFixed(2)}</span>
      </div>
      <Button className="w-full  bg-[#1689FE] rounded-md py-5 hover:bg-[#168afee1]" onClick={onClick}>
        <span>{icon}</span>
    <span>  {name}</span>
      </Button>
    </div>
  );
}

export default Summary;
