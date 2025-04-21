// Page stats
import React from 'react';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import  { QueryClient, useQuery}      from '@tanstack/react-query';


const statsQuery = {
    queryKey:['stats'],
    queryFn: async () => {
        const response = await customFetch.get('/jobs/stats');
        return response.data;
    }
    
};


// Función loader: se ejecuta antes de renderizar el componente para cargar datos desde la API
export const  loader = (queryClient) => async () => {
    const data = await queryClient.ensureQueryData(statsQuery);
    return null;
};

const Stats = () => {

    // Obtiene los datos devueltos por el loader (defaultStats y monthlyApplications)
    //const { defaultStats, monthlyApplications } = useLoaderData();

    const {data} = useQuery(statsQuery);
    const { defaultStats, monthlyApplications } = data;

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