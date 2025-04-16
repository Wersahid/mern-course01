// Page stats
import React from 'react';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

// Función loader: se ejecuta antes de renderizar el componente para cargar datos desde la API
export const  loader = async () => {
   try {
    // Realiza una solicitud GET a la ruta '/jobs/stats' usando customFetch (Axios personalizado)
     const response = await customFetch.get('/jobs/stats');

     return response.data;  // Devuelve los datos recibidos (defaultStats y monthlyApplications)

   } catch (error) {
    return error;
   }
};

const Stats = () => {

    // Obtiene los datos devueltos por el loader (defaultStats y monthlyApplications)
    const { defaultStats, monthlyApplications } = useLoaderData();

    // Renderiza los componentes de estadísticas y gráfico
    return(
        <>
        {/* Componente que muestra estadísticas generales (pendientes, entrevistas, rechazados) */}
        <StatsContainer defaultStats={defaultStats} />

        {/* Si hay más de un mes de datos, muestra el gráfico con monthlyApplications */}
        { monthlyApplications?.length > 1 &&  ( <ChartsContainer data={monthlyApplications} /> ) }
        </>
    )
};

export default Stats;