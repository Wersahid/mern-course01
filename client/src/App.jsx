import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // para que podamos usar router

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // react query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';      // react query

// importamos las paginas que utilizaremos en las rutas
import {
     AddJob,
     Admin,
     AllJobs,
     DashboardLayout,
     DeleteJob,
     EditJob,
     Error,
     HomeLayout,
     Landing,
     Login,
     Profile,
     Register,
     Stats
  
 }   from './pages';
 import  { action as registerAction}     from './pages/Register'; // importamos de la pagina register el metodo action , lo incorporamos en la ruta register
 import  { action as loginAction}        from './pages/Login';  // importamos de la pagina login el metodo action , lo incorporamos en la ruta login
 import  {action  as addJobAction}       from  './pages/AddJob';  // importamos el action de la pagina './pages/AddJob.jsx'
 import    {loader as dashboardLoader}   from './pages/DashboardLayout';
 import    {loader as allJobsLoader}  from './pages/AllJobs'; // importamos el loader de la pagina './pages/AllJobs.jsx'
 import    {loader as editJobLoader}  from  './pages/EditJob'; // incorporamos el loader de EditJob
 import    {action as editJobAction}  from  './pages/EditJob'; // incorporamos el action de EditJob
 import    {action as deleteJobAction} from  './pages/DeleteJob'; // delete job
 import    {loader as adminLoader}     from  './pages/Admin';        // loader admin
 import    {action as profileAction}   from  './pages/Profile';
 import    {loader as statsLoader}     from  './pages/Stats';   // importamos el loader de stats
import            ErrorElement         from './components/ErrorElement';

// *** section para cambiar de theme claro a oscuro ***
// insertando el codigo aca podremos cambiar el theme en todas las paginas
// creamos una arrow para ver por defecto el thema establecido
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;
} ;

  checkDefaultTheme();
// ******************************************************

// react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});


//import HomeLayout from './pages/HomeLayout.jsx';

 // **** Definimos las Rutas de la Aplicacion usando createBrowserRouter******
const router = createBrowserRouter([    
  {
   path:'/',                  // ruta princial 
   element: <HomeLayout/>, // utilizamos el homeLayout
   errorElement:<Error/>, // por error en el url nos mostrara el mensaje en la clase Error
   children:[   // estas seran las rutas hijas
    {
     index: true,
     element: <Landing/>
    },
    {                   
      path: 'register',     // route children
      element: <Register/>,
      action:registerAction
    },
    {
      path: 'login',    // route childrem
      element: <Login/>,
      action: loginAction(queryClient)
    },
    {
      path: 'dashboard',
      element: <DashboardLayout queryClient={queryClient} />, // incorporamos queryClient para cargar los datos temporalmente
      loader: dashboardLoader(queryClient),        // incorporamos el loader que permite cargar los datos necesarios para la página de manera anticipada
       // creamos las rutas children de dashboard
      children: [
        {
          index:true,
          element:<AddJob/>,
          action: addJobAction(queryClient)
        },
        {
          path: 'stats',         // route donde se redireccionara
          element:<Stats/>,
          loader: statsLoader(queryClient),
          errorElement: <ErrorElement />
        },
        {
          path: 'alljobs',      // route
          element:<AllJobs/>,
          loader: allJobsLoader(queryClient), // implementamos el loader
          errorElement: <ErrorElement />
        },
        {
          path: 'profile',      //route
          element:<Profile/>,
          action: profileAction(queryClient)
        },
        {
          path: 'admin',       // route
          element: <Admin/>,
          loader: adminLoader
        },
        {
          path: 'editjob/:id',
          element: <EditJob/>, // incorporamos la ruta editjob
          loader:  editJobLoader(queryClient),
          action:  editJobAction(queryClient)
        },
        {
          path: 'deletejob/:id',   // implementamos el deletejob
          action: deleteJobAction(queryClient)
        }
      ]
    },
    {
      path:'error',
      element: <Error/>
    },
   ],
  },

]);

    // componente principal de la aplicacion
    // implementamos algunos metodos de react query
const App =() => {
  return(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router = {router} />;
        <ReactQueryDevtools initialIsOpen={false}/>

      </QueryClientProvider>
  );
};

export default App;
