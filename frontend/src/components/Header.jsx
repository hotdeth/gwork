import { useAuth } from "../contexts/AuthContext";

function Header(){
    const {user} = useAuth();
    const {logoutUser} = useAuth();


    return(<>
    <div className="flex items-center backdrop-blur-2xl z-10 right-0 left-0 justify-between border-b border-black/20 fixed px-10 bg-none p-2 text-black  ">
        <p className="text-2xl font-bold">{user.name}</p>
        <p>GroupID:343456765342123</p>
        <button onClick={()=> logoutUser()} className=" font-stretch-50%  px-3 rounded border-2 hover:bg-red-500 transition-colors duration-100">logout</button>
    </div>
    </>)
}


export default Header;