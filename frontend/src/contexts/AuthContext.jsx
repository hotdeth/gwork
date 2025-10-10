import { createContext , useContext , useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) =>{
    const [user , setUser] = useState(()=>JSON.parse(localStorage.getItem("user")));
    const [token , setToken] = useState(()=> localStorage.getItem("token"));

    const loginUser = (userData , token) =>{
        setUser(userData);
        setToken(token);
        localStorage.setItem("token" , token);
        localStorage.setItem("user", JSON.stringify(userData));

    };
    
    const logoutUser = ()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    };

    return(
        <AuthContext.Provider value={{ user , token, loginUser , logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);