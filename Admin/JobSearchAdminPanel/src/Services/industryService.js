import { BASE_URL } from "./url";
import axios from "axios";


// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// get all data
export async function getAllData(endpoint) {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// create data
export async function createIndustry(endpoint, payload) {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, payload)
        return response;
    } catch (error) {
        console.log(error);
    }
}

// delete data
export async function deleteDataById(endpoint, id) {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// update data
export async function updateDataById(endpoint,payload) {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, payload);
    return response
}

export const endpoint = {
    industries: "industries",
    jobs: "jobs",
    categories: "categories",
    companies: "categories"
}