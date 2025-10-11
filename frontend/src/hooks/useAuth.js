import { useAuth } from "../contexts/AuthContext";
import * as authApi from "../api/auth";


export const useAuthHook = () =>{
    const {loginUser , logoutUser} = useAuth();

    const login = async(credentials) => {
        const res = await authApi.login(credentials);
        loginUser(res.data.user, res.data.token);
    };

    const register = async(data) =>{
        const res = await authApi.register(data);
        loginUser(res.data.user , res.data.token);
    }

    const logout = async()=>{
        await authApi.logout();
        logoutUser();
    };

    return {login , logout , register}
}

