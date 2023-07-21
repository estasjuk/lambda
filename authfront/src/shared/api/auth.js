import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:5001',
  });

const setToken = (token) => {
    if(token) {
        return instance.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    instance.defaults.headers.common.authorization = "";
};

instance.interceptors.response.use(response => response, async (error) => {
    if(error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const {data} = await instance.post("/auth/refresh", {refreshToken})
            setToken(data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            return instance(error.config);
        }
        catch(error) {
            return Promise.reject(error);
        }
    } 
    return Promise.reject(error);
})

export const signup = async (data) => {
    const {data: result} = await instance.post("/signup", data);
    return result;
}

export const login = async ({ email, password }) => {
    const {data} = await instance.post(
        `/login?email=${email}&password=${password} `,
        { email, password });
    
    setToken(data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
}

export const logout = async() => {
    const data = await instance.post("/logout");
    setToken();
    return data;
}

export const getCurrent = async(token) => {
    try {
        setToken(token);
        const {data} = await instance.get("/me");
        return data;
    } catch (error) {
        setToken();
        throw error;
    }
}

export default instance;