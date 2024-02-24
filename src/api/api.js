import axios from "axios";

// const baseURL = process.env.BASE_URL;
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});

export const userRegistration = async (formData) => {
  try {
    // console.log("dataFORMMMMM...........",formData)
    let response = await api.post(`http://localhost:4444/signup`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCountries= async ()=>{
  try {
    let response= await api.get('http://localhost:4444/getCountries')
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getStates= async (countryid)=>{
  try {
    let response= await api.post(`http://localhost:4444/getStates/${countryid}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const getCities= async (stateid)=>{
  try {
    let response= await  api.post(`http://localhost:4444/getCities/${stateid}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}