// ** En esta clase unimos los componentes de clase (smallsidebar,bigsidebar,nav) en las rutas , (dashboard,admin,alljobs,stats,profile)
import           React, { useContext, createContext, useState }     from 'react'; // importamos el hook use State para trabajar con estados
import         { Outlet, redirect, useLoaderData, useNavigate }  from 'react-router-dom';// importamos Outlet para poder usar las rutas hijas 
import           Wrapper                            from '../assets/wrappers/Dashboard';// importamos su Wrapper
import { BigSidebar, Navbar, SmallSidebar }         from '../components'; // importamos las clases componentes
import           {checkDefaultTheme}                from '../App'; // importamos la funcion para cambiar el theme en las paginas
import            customFetch                       from '../utils/customFetch';
import              { toast }                       from 'react-toastify';


export const loader = async () => {             // incorporamos el loader permite cargar los datos necesarios para la página de manera anticipada
    try {
        const {data} = await customFetch.get('/users/current-user') // custom fetch para determinar la base de la url
        return data;
    } catch (error) {
        return redirect('/');
    }

    
}
                                           // permite compartir datos y funciones
const DashboardContext = createContext()   // para acceder a otros datos directamente   


const DashboardLayout = ({queryClient}) => {
    const {user} = useLoaderData();     // incorporamos el loader, determinamos que en el login aparecera el name del usuario logueado
  
    const navigate = useNavigate(); // implementamos la libreria de doom useNavigate
    const [ showSidebar, setShowSidebar ]= useState(false); // estado para controlar la visibilidad
    const [ isDarkTheme, setIsDarkTheme ]= useState(checkDefaultTheme());  // estado para comtrolar el tema oscure
    
    const toggleDarkTheme = () => {    // para activar el cambio de icono de dia y noche
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme',newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    
    }
    const toggleSidebar =() => {
        setShowSidebar(!showSidebar);         // cambia el estado de showSidebar  (true/false)
    }
                // LOGOUT  de usuario
    const logoutUser = async() => {
        navigate('/'); // nos redireccionara a la pagina principal
        await customFetch.get('/auth/logout');  // al hacer click redireccionara la pagina a logout y expirara la sesion
        toast.success('Logging out....');  //  toastyfi  message
    };


    return(                 // dashboardContext.Provider,  envolvera todos los componentes hijos que seran los que estan contenidos                                                                                    
        <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,toggleSidebar,logoutUser}}>        {/* uso de Context*/ }

        <Wrapper>
            <main className='dashboard'>

                {/* Hacemos uso de las classes componente smallsidebar,bigsidebar,nav */}
             <SmallSidebar/>
             <BigSidebar/>
             <div>
                <Navbar/>
                <div className='dashboard-page'>
                    <Outlet context={{ user }}/>  {/* nos mostrata el nombre del usuario en todas la paginas*/}

                </div>
             </div>
            </main>           
        </Wrapper>

        </DashboardContext.Provider>                                                                                       
    );                                                                                                                      {/* uso de Context*/ }

};


export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;

