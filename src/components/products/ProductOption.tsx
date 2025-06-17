/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { instance } from "@/api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import ProductOptionSkeleton from "./ProductOptionSkeleton";
import { useNavigate } from "react-router-dom";
import { Products, ProductVariant, Attribute } from "@/components/types/type";

interface ProductOptionProps {
  product: Products;
}

function ProductOption({ product }: ProductOptionProps) {
  const [count, setCount] = useState<number>(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [availableOptions, setAvailableOptions] = useState<Record<string, string[]>>({});
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.ProductVariant) {
      const initialOptions = calculateAvailableOptions(product.ProductVariant, {});
      setAvailableOptions(initialOptions);
    }
  }, [product]);

  const getRequiredAttributes = (): string[] => {
    if (!product?.ProductVariant) return [];
    const attributeNames = new Set<string>();
    product.ProductVariant.forEach((variant) => {
      variant.attribute.forEach((attr) => attributeNames.add(attr.name));
    });
    return Array.from(attributeNames);
  };

  // Check if there's only one attribute type
  const hasSingleAttribute = (): boolean => {
    return getRequiredAttributes().length === 1;
  };

  const calculateAvailableOptions = (
    variants: ProductVariant[],
    selectedAttributes: Record<string, string>
  ): Record<string, string[]> => {
    const availableOptions: Record<string, Set<string>> = {};

    // If there's only one attribute, all options should remain available
    if (hasSingleAttribute()) {
      variants.forEach((variant) => {
        variant.attribute.forEach((attr) => {
          if (!availableOptions[attr.name]) {
            availableOptions[attr.name] = new Set();
          }
          availableOptions[attr.name].add(attr.value);
        });
      });
    } else {
      // Existing logic for multiple attributes
      variants.forEach((variant) => {
        const matches = Object.keys(selectedAttributes).every(
          (key) =>
            !selectedAttributes[key] ||
            variant.attribute.some((attr) => attr.name === key && attr.value === selectedAttributes[key])
        );

        if (matches) {
          variant.attribute.forEach((attr) => {
            if (!availableOptions[attr.name]) {
              availableOptions[attr.name] = new Set();
            }
            availableOptions[attr.name].add(attr.value);
          });
        }
      });
    }

    return Object.fromEntries(
      Object.entries(availableOptions).map(([key, value]) => [key, Array.from(value)])
    );
  };

  const handleAttributeSelect = (name: string, value: string) => {
    // If there's only one attribute, don't disable anything
    if (hasSingleAttribute()) {
      const newSelectedAttributes = { ...selectedAttributes, [name]: value };
      setSelectedAttributes(newSelectedAttributes);

      if (product?.ProductVariant) {
        const selectedVariant = product.ProductVariant.find((variant) =>
          variant.attribute.every((attr) => newSelectedAttributes[attr.name] === attr.value)
        );
        setSelectedVariantId(selectedVariant ? selectedVariant.id : null);

        // Keep all options available
        const allOptions = calculateAvailableOptions(product.ProductVariant, {});
        setAvailableOptions(allOptions);
      }
      return;
    }

    // Existing logic for multiple attributes
    if (!availableOptions[name]?.includes(value)) {
      return;
    }

    const newSelectedAttributes = { ...selectedAttributes };
    if (selectedAttributes[name] === value) {
      delete newSelectedAttributes[name]; // Unselect the attribute
    } else {
      newSelectedAttributes[name] = value; // Select the new value
    }
    setSelectedAttributes(newSelectedAttributes);

    if (product?.ProductVariant) {
      const newAvailableOptions = calculateAvailableOptions(product.ProductVariant, newSelectedAttributes);
      setAvailableOptions(newAvailableOptions);

      const requiredAttributes = getRequiredAttributes();
      const allAttributesSelected = requiredAttributes.every((attrName) => newSelectedAttributes[attrName]);

      if (allAttributesSelected) {
        const selectedVariant = product.ProductVariant.find((variant) =>
          variant.attribute.every((attr) => newSelectedAttributes[attr.name] === attr.value)
        );

        if (selectedVariant) {
          setSelectedVariantId(selectedVariant.id);
        } else {
          setSelectedVariantId(null);
        }
      } else {
        setSelectedVariantId(null);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      toast.error("Please select a valid variant combination");
      return;
    }
    try {
      const res = await instance.post("cart", {
        userId: userData.id,
        variantId: selectedVariantId,
        quantity: count,
      });
      toast.success("Added to cart");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Failed to add to cart");
      }
      console.error("Cart error:", error);
    }
  };

  if (!product || !product.image) {
    return <ProductOptionSkeleton />;
  }

  const attributeOptions = product.ProductVariant
    ? product.ProductVariant.reduce(
        (acc: Record<string, { value: string; image?: string; variantId: string }[]>, variant: ProductVariant) => {
          variant.attribute.forEach((attr: Attribute) => {
            if (!acc[attr.name]) {
              acc[attr.name] = [];
            }
            if (!acc[attr.name].find((a) => a.value === attr.value)) {
              acc[attr.name].push({
                value: attr.value,
                image: attr.image,
                variantId: variant.id,
              });
            }
          });
          return acc;
        },
        {}
      )
    : {};

  const selectedVariantImage =
    product.ProductVariant?.find((variant) => variant.id === selectedVariantId)?.attribute.find(
      (attr) => attr.image
    )?.image || product.image;

  const selectedVariantPrice =
    product.ProductVariant?.find((variant) => variant.id === selectedVariantId)?.price || product.price;

  const order = {
    selectedAttributes,
    product,
    count,
    selectedVariantId,
    variantImage: selectedVariantImage,
    variantPrice: selectedVariantPrice,
  };

  return (
    <div className="md:w-[40%]  w-full ">
      <div className="flex flex-col gap-7 ">
        {/* Product Name & Price */}
        <div className="space-y-4 md:space-y-2">
          <p className=" text-2xl font-semibold  text-[#292929] tracking-wider">
            {product.name}
          </p>
          <div className="flex justify-between">
            <p className="font-bold text-lg">{selectedVariantPrice} ETB</p>
            <div>⭐4.5</div>
          </div>
          <hr />
          <div>
            <p className="text-[#666666] font-light">{product.descripion}</p>
          </div>
        </div>

        {/* Dynamic Attributes */}
        {Object.entries(attributeOptions).map(([name, options]) => (
          <div key={name} className="lg:block lg:space-y-2 md:flex md:gap-4 mb-4">
            <div className="text-gray-400 mb-2">
              <span>
                {name}: {selectedAttributes[name] || `Select ${name.toLowerCase()}`}
              </span>
            </div>
            <div className="flex gap-4">
              {options.map((option: any, index: Key | null) => {
                const isDisabled = !hasSingleAttribute() && !availableOptions[name]?.includes(option.value);
                return (
                  <div
                    onClick={() => handleAttributeSelect(name, option.value)}
                    key={index}
                    className={`cursor-pointer flex items-center justify-center border border-black hover:outline-black hover:outline-1 ${
                      selectedAttributes[name] === option.value ? "outline-black outline-1" : ""
                    } ${
                      option.image
                        ? "bg-[#0000000A] size-16 md:size-12 border-none"
                        : "w-fit px-2 h-8 rounded-sm"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={`${name} ${option.value}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p>{option.value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quantity */}
        <div className="space-y-2 flex lg:block  items-center gap-8">
          <div>
            <span>Quantity</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-black w-32 py-2.5 bg-white border-1 border-black text-center rounded-md">
              <div className="flex justify-around">
                <button
                  disabled={count <= 1}
                  className={count <= 1 ? "cursor-not-allowed disabled:opacity-50" : ""}
                  onClick={() => setCount(count - 1)}
                >
                  -
                </button>
                <p>{count}</p>
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-10 lg:gap-7 md:gap-5 overflow-hidde">
          <Button
            onClick={handleAddToCart}
            className="text-black py-[1.4rem] hover:outline-2 hover:outline-black cursor-pointer px-12 lg:px-14 md:px-[10%]  bg-white hover:bg-white border-1 border-black shadow-none text-center rounded-md"
          >
            Add to Cart
          </Button>
          <Button
            onClick={() => navigate("/checkout")}
            className=" px-12 lg:px-14  py-[1.4rem]  cursor-pointer shadow-none text-center rounded-sm md:px-[10%] "
            disabled={!selectedVariantId}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductOption;