import About from "../about/About"
import CompanyHome from "../home/CompanyHome"
import WorkerHome from "../home/WorkerHome"
import Login from "../login/Login"
import Registration from "../registration/Registration"



export const privateCompanyRoutes = [
    {path: '/', component: <CompanyHome/>, exact: true},
    {path: '/company-home', component: <CompanyHome/>, exact: true},
    {path: '*',  component: <CompanyHome/>, exact: true},
]
export const privateWorkerRoutes = [
    {path: '/', component: <WorkerHome/>, exact: true},
    {path: '/worker-home', component: <WorkerHome/>, exact: true},
    {path: '*',  component:<WorkerHome/>, exact: true},
]
export const publicRoutes = [
    {path:'/login', component: <Login/>, exact: true},
    {path: '/registration', component: <Registration/>, exact: true},
    {path: '/', component: <About/>, exact: true},
    {path: '*',  component: <About/>, exact: true},
    
]