import { Key, useEffect, useState } from "react";
import ViewAllButton from "../common/ViewAllButton";
import ProductItem from "./ProductItem";

import { useNavigate } from "react-router-dom";
import { instance } from "@/api/axiosInstance";
import { Category, Products } from "../types/type";

function Product() {
  // const { productData, setProductData } = useAuth();
  const [ category, setCategory ] = useState<Category[]>([]);
  const navigate=useNavigate()
  console.log('parents',category)
 
  const fetchProducts = async () => {
    try {
      const response = await instance.get(`categories/with-products`);
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProducts = async (id:string) => {
    
    navigate(`/allproducts/${id}`)
   
  };


  useEffect(() => {
    fetchProducts();
    
  }, []);

  return (
    <div className="flex justify-center flex-col items-center py-10 space-y-16">
      {category.map((category, index) => (
        <div key={index} className="space-y-6">
          <h2 className="text-4xl font-semibold  text-start">{category.name}</h2>

          <div className="grid grid-cols-2 gap-4  sm:grid-cols-2 md:grid-cols-2 md:gap-5s lg:grid-cols-4 lg:gap-8 place-items-center ">
            {/* {category.products.length >=1 &&} */}
            {category.products.slice(0, 4).map((product:Products, key:Key | null) => (
              <ProductItem
                key={key}
                img={product.image[0]}
                name={product.name}
                price={product.price}
                id={product.id}
              />
            ))}
          </div>

          <div className="flex justify-center" onClick={()=>handleProducts(category.id)}>
            <ViewAllButton />
           
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
