import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log(
                    'error caught from interceptors --> ', error.response
                )
                if(error.response.status === 401 || error.response.status === 403){
                    // logout
                    logOut()
                    navigate('/auth/login')
                }
            }
        )
    }, [logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;