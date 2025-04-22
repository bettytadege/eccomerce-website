import axios from "axios";

export const instance=axios.create({
    baseURL:'http://localhost:7880/',
   
        headers: { "Content-Type": "application/json" },
       
    
})