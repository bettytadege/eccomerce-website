import axios from "axios";

export const instance=axios.create({
    // baseURL:'http://localhost:7880/',
    baseURL:'https://ecommerce-backend-07hy.onrender.com/',
   
        headers: { "Content-Type": "application/json" },
       
    
})