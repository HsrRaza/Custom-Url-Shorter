import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10s
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { data, status } = error.response;

            switch(status){
                case 400:
                    console.error("Bad request :", data);
                    break;
                case 401:
                    console.error("Unauthorized :", data);
                    break;
                case 403:
                    console.error("Forbidden :", data);
                    break;
                case 404:
                    console.error("Not found :", data);
                    break;
                case 500:
                    console.error("Internal server error :", data);
                    break;
                default:
                    console.error("Server error :", data);
                    break;
            }
        } else if(error.request){
            console.error("Network error :", error.request);
        } else {
            console.error("Unexpected error :", error.message);
        }

        return Promise.reject({
            isAxiosError:true,
            message:error.response?.data?.message || error.message || "Unkown Err",
            status:error.response?.status,
            data:error.response?.data,
            originalError:error
        });

    }
);

export default axiosInstance;