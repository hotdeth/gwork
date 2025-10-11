import { useAuth } from "../contexts/AuthContext";



function Header(){
    const {user} = useAuth();


    return(<>
    <div>{user.name}</div>
    </>)
}


export default Header;