import {useLocation, Navigate, Outlet} from "react-router-dom"
import useAuth from "../customHook/useAuth"

const RequiredAuth = () => {
    const {auth, setLogin} = useAuth()
    const location = useLocation();

    return (
        auth?.accessToken ? <Outlet /> : <>
        <Navigate to="/" state = {{from:location}} replace />
        {setLogin(true)}
        </>
    )
}

export default RequiredAuth;


