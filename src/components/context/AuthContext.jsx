import {useState, useEffect, useContext, createContext} from "react"

const AuthContext = createContext(null);
export function AuthProvider({children}){
const [user, setUser] = useState(null);

useEffect(()=>{
    const saved = localStorage.getItem("courseUser");
    if(saved) setUser (JSON.parse(saved))
},[])
 
async function login(email,password){
const data = {id:1, name:"Alex Ferguson",email};
setUser(data);
localStorage.setItem("courseUser", JSON.stringify(data));
return data;
}

function logout(){
    setUser(null);
    localStorage.removeItem("courseUser");
}
return(
    <AuthContext.Provider value = {{user,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}

export function useAuth(){
    return useContext(AuthContext);
}