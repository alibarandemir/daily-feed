import axios from "axios";



export const api= axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL
}) 

export const apiRoute= axios.create({
    baseURL:'http://localhost:3000/api'
})





