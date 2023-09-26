import axios from 'axios';

// export function getUserToken() {

//   return localStorage.getItem('userToken');
// }

const NewaccessToken = localStorage.getItem("NewaccessToken")


const instance = axios.create({
    baseURL: 'http://65.2.174.18:70/api/',
    timeout: 5000,
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        Authorization: `Bearer ${NewaccessToken}`,
    },
});

export const noauthinstance = axios.create({
    baseURL: 'http://65.2.174.18:70/api/',
    timeout: 5000,
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
    },
});

//Add a request interceptor
// instance.interceptors.request.use(
//     (config) => {
//         const userToken = getUserToken(); // Implement this function to retrieve the user token

//         if (userToken) {
//             config.headers.Authorization = `Bearer ${userToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
