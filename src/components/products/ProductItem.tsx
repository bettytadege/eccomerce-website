/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";


type ProductItemProps = {
  id: string;
  img: string;
  name: string;
  price: number;
};

function ProductItem({ img, price, name, id }: ProductItemProps) {
  const navigate = useNavigate();
  const { setProductId } = useAuth();

  

  const handleClick = (id: string) => {
    setProductId(id);
    navigate(`/product/${id}`);
  };
const cardVariants = {
  hidden: {
    x: 0,
    y: 30,         
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.1,
      duration: 0.5,
      ease: "easeOut",
    }as any,
  },
};


  return (
    <motion.div
      whileInView={'show'}
      initial='hidden'
     variants={cardVariants}
      viewport={{once:true}}
      className="bg-white w-[190px] h-[270px] sm:w-[260px] sm:h[400px] md:w-[360px] md:h-[410px] lg:w-[263px]  lg:h-[345px]"
      onClick={() => handleClick(id)}
    >
      <div className="w-full h-[200px]   md:h-[300px] sm:h-[220px] lg:h-[230px]  ">
        <img
          src={img}
          alt=""
          className="w-full h-full rounded-2xl object-cover hover:scale-105 duration-500 ease-in-out transition-transform"
        />
      </div>
      <div className="text  pt-1 flex flex-col gap-1 ">
        <a href="" className="hover:underline font-light line-clamp-1 ">
          {name}
        </a>
        <p className="font-normal">{price} ETB</p>
      </div>
    </motion.div>
  );
}

export default ProductItem;
