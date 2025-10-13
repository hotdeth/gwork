import { useAuth } from "../contexts/AuthContext";



function Header(){
    const {user} = useAuth();


    return(<>
    <div className="flex items-center backdrop-blur-2xl z-10 right-0 left-0 justify-between border-b border-black/20 fixed px-10 bg-none p-2 text-black  ">
        <p className="text-2xl font-bold">{user.name}</p>
        <p>GroupID:343456765342123</p>
        <button className="bg-red-700  px-3 rounded font-bold">logout</button>
    </div>
    </>)
}


export default Header;