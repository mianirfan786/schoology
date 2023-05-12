import axios from 'axios';

import postCheckListApi from './submitLoginApi';
export const DEV_URL = 'Crm.notion-edu.com';
// 'http://156.200.117.187';

export const api = axios.create({
  baseURL: DEV_URL,
});

export const API = {
  v1: {
    postCheckListApi,
  },
};
