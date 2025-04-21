// pagina para configurar AllJobs
//import React from 'react';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components'; // importamos los metodos JobsContainer y SearchContainer
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allJobsQuery = (params) => {
     const  { search, jobStatus, jobType, sort, page } = params;
     return {
          queryKey: [
               'jobs',
               search ?? '',
               jobStatus ?? 'all',
               jobType ?? 'all',
               sort ?? 'newest',
               page ?? 1,
          ],
          queryFn: async () => {
               const {data} = await customFetch.get('/jobs', { params });  // pide datos a express mediante esta api, complementa a la url de /jobs con { params }
               return data;
          }
     };
};

// incorporamos el loader que permite cargar los datos necesarios para la página de manera anticipada
export const loader = (queryClient) => async ({ request }) => {
     console.log(request.url);

     // Extrae los parámetros de la URL (como page, limit, search, etc.) y los convierte en un objeto JavaScript.
     // Por ejemplo: { page: "2", limit: "5" }
     const params = Object.fromEntries([ ...new URL(request.url).searchParams.entries() ]);
    // console.log(params);
   
      await queryClient.ensureQueryData(allJobsQuery(params));
          return { searchValues: {...params}}; // $$ searchValues ... auto search section $$$
         // return{jobs:data.jobs};

};

//**** loader all jobs functional ********* */
// incorporamos el loader que permite cargar los datos necesarios para la página de manera anticipada

// export const loader = async () => {
//      console.log('hello everyone')
//      try {
//           const {data} = await customFetch.get('/jobs'); // pide datos a express mediante esta api, desde aca el front
//           return {data};
//          // return{jobs:data.jobs};
//      } catch (error) {
//           toast.error(error?.response?.data?.msg);   // por error nos mostrara un mensaje
//           return error;
//      }
// };
// ********************************************////



                        // permite compartir datos y funciones
                        // para acceder a otros datos directamente
const AllJobsContext = createContext();
const AllJobs = () => {
     const { searchValues } = useLoaderData(); // incorporamos el loader, determinamos que en la pagina AllJobs aparecera el name del usuario logueado
     const { data } = useQuery(allJobsQuery(searchValues));
     //console.log(data);
     // implementamos  los metodos JobsContainer y SearchContainer de la clase '../components'
     // nos mostrara en esta pagina el contenido en esos metodos funciones mensajes etc.

     return(  //AllJobsContext.Provider, Su función es "proveer" (hacer disponible) los datos a todos los componentes hijos que estén dentro de él.
          <AllJobsContext.Provider value={{data, searchValues}}>
                  
          <SearchContainer/>    
          <JobsContainer/>

          </AllJobsContext.Provider>
     );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;