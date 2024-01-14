import axios from "axios";

const baseURL = process.env.BACKEND_URL;
console.log(baseURL);

const instance = axios.create({
    baseURL: "http://172.22.0.0/api/v1",
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.defaults.headers.common = {
    // Auth: `${localStorage.getItem("token")}`,
    // "Content-Type": "application/json",
};

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log(">>>Response: ", response)
        return response && response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(">>>Có lỗi", error);
        return error?.response?.data ?? Promise.reject(error);
    }
);

export default instance;
