import axios from 'axios';
import BASE_URL from '../constants/url';

export const getGarageInfo = (id) => axios.get(`${BASE_URL}/garage/${id}`);

export const getGarageAvailablity = (id) => axios.get(`${BASE_URL}/garage-availablity/${id}`);

export const getGarageAmenities = (id) => axios.get(`${BASE_URL}/garage-amenities/${id}`);

export const getGaragePricing = (id) => axios.get(`${BASE_URL}/pricing/${id}`);

export const startParking = (
  { garageId, userId, carRegestrationNumber },
) => axios.post(`${BASE_URL}/start-parking/`, { garageId, userId, carRegestrationNumber });

export const stopParking = (transactionId = 1) => axios.get(`${BASE_URL}/stop-parking/${transactionId}`);
