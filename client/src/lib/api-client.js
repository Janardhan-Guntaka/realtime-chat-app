import axios from 'axios';
import {HOST} from '../utils/constants';

export const apiClient = axios.create({ // create an instance of axios client, which can be used to make http requests
    baseURL: HOST, // set the base url for api client for all http requests made using this instance
})