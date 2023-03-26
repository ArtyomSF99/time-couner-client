import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext, WorkerContext } from "./context"
import Registration from "./registration/Registration"
import { privateCompanyRoutes, privateRoutes, privateWorkerRoutes, publicRoutes } from "./router/router"



const AppRouter = () => {
    
    const {isAuth} = useContext(AuthContext)
    const {isWorker} = useContext(WorkerContext)
    console.log(isAuth, isWorker)
    return(
        isAuth
        ? isWorker?<Routes>
            {privateWorkerRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
        </Routes>
        :<Routes>
        {privateCompanyRoutes.map(route =>
        <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
        )} 
    </Routes>
        :<Routes>
            {publicRoutes.map(route =>
            <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
            )} 
            <Route path="*" element={<Registration/>}/>
        </Routes>
        
       
    )
}

export default AppRouter