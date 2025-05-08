export type Product={
    
    id:string,
    name:string,
    descripion:string,
    image:string[],
    price:number,
    stoke:number,
    sku:string,
    sellerId:string,
    mainCategoryId:string,
    categoryId:string,
    // ProductVariant:ProductVariant[]

}
export type Attribute= {
    name: string;
    value: string;
    // image?: string;
  }
  
  export type ProductVariant= {
    id: string;
    stock: number;
    sku: string;
    productId: string;
    price: number;
    attribute: Attribute[];
    product:Product[]
  }

export type User={
    name?:string, 
    email:string,
    firebaseUid:string,
    phoneNumber?:string,
  id:string
}

export type Category={
    
    name:string, 
    id:string,
    children:string[]
}

export type Cart={
    id:string,
    variantId:string, 
    userId:string, 
    quantity:number,
    productVariant?:ProductVariant[]
}

export type Address = {
  id: string;
  city: string;
  state: string;
  street: string;
  postalCode?: string;
};