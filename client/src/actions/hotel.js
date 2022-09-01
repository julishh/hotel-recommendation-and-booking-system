import axios from "axios";

export const createHotel = async (token, data) => {
  await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const registerHotel = async (token, data) => {
  await axios.post(`${process.env.REACT_APP_API}/register-hotel`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sellerHotels = async (token) => {
  await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const read = async (hotelId) => {
  await axios.get(`${process.env.REACT_APP_API}/hotel/:hotelId`);
};

export const searchListing = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);
