import axios from 'axios';
import BASE_URL from '../constants/url';

export const getGarageInfo = (id) => axios.get(`${BASE_URL}/garage/${id}`);

export const getGaragePricing = (id) => axios.get(`${BASE_URL}/pricing/${id}`);
