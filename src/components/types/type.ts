
export type Products={
    
    id:string,
    name:string,
    descripion:string,
    image:string[],
    price:number,
    stock:number,
    sku:string,
    sellerId:string,
    mainCategoryId:string,
    categoryId:string,
    ProductVariant:ProductVariant[]

}
export type Attribute= {
  
    name: string;
    value: string;
    image?: string;
  }
  
  export type ProductVariant= {
    id: string;
    stock: number;
    sku: string;
    productId: string;
    price: number;
    attribute: Attribute[];
    product:Products
  }

export type User={
    name?:string, 
    email:string,
    firebaseUid:string,
    phoneNumber?:string,
   id:string,
  address:Address
}


export type Category={
    
    name:string, 
    id:string,
    children:string[],
    products:Products[]
}

export type Cart={
    id:string,
    variantId:string, 
    userId:string, 
    quantity:number,
    productVariant?:ProductVariant
}

export type Address = {
  id: string;
  city: string;
  state: string;
  street: string;
  postalCode?: string;
};

export type Order= {
  id: string;
  userId: string;
  status: OrderStatus; 
  productId: string;
  quantity: number;
  subTotal: number;
  variantId: string;
  cartId?: string | null;
  addressId?: string | null;
  product?: Products;
  productVariant?: ProductVariant;
  user?: User;
  cart?: Cart;
  address?: Address;
}


export enum OrderStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  DELIVERED = 'DELIVERED',
  CONFIRMED = 'CONFIRMED',
}
