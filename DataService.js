import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data/';

const createData = async (token, data) => {
  return axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
};

const getData = async (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export default { createData, getData };
