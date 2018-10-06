import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://drinkstoreproject.firebaseio.com/'
})

export default instance;