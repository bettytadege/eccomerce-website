
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import { Products } from "../types/type";
import { instance } from "@/api/axiosInstance";
import { PaginationSection } from "../pagnation/PaginationSection";

function AllProducts() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Products[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(4); 
  const totalPages=Math.ceil(totalProducts / limit)

  // console.log("category id from all product", id);

  const fetchProducts = async (id: string, page: number) => {
    const offset = (page - 1) * limit;
    try {
      const response = await instance.get(`/product/catagory/${id}`, {
        params: { limit, offset },
      });
      // console.log("all product", response);
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts(id, currentPage);
    }
  }, [id, currentPage]);

  return (
    <>
      <div className="py-14 space-y-16 flex justify-center w-full">
        <div className="grid grid-cols-2 gap-4 sm:g6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-5 place-items-center">
          {products.map((product: Products, key: Key | null) => (
            <ProductItem
              key={key}
              img={product.image[0]}
              name={product.name}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>
      </div>
      {totalPages > 1 &&
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />}
    </>
  );
}

export default AllProducts;