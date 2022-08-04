import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [login, setLogin] = useState(false)
    return (
        <AuthContext.Provider value={{auth, setAuth, login, setLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext