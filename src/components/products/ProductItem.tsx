import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProductItemProps = {
  id?: string;
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
  return (
    <>
     
      <div
        className="bg-white w-[190px] h-[270px] sm:w-[260px] sm:h[400px] md:w-[360px] md:h-[410px] lg:w-[263px]  lg:h-[345px]"
        onClick={() => handleClick(id)}
      >
        {"  "}

        <div className="w-full h-[200px]   md:h-[300px] sm:h-[220px] lg:h-[230px]  ">
          <img
            src={img}
            alt=""
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
        <div className="text  pt-1 flex flex-col gap-1 ">
          <a href="" className="hover:underline font-light line-clamp-1 ">
            {name}
          </a>
          <p className="font-normal">{price} ETB</p>
        </div>
      </div>
     
    </>
  );
}

export default ProductItem;
