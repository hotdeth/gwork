import { useAuth } from "../contexts/AuthContext";
import * as authApi from "../api/auth";


export const useAuthHook = () =>{
    const {loginUser , logoutUesr} = useAuth();

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
        logoutUesr();
    };

    return {login , logout , register}
}

