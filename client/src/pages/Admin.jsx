// Admin page
import React from 'react';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';   
import { StatItem } from '../components';   // importamos Statitem   '../components/Statitem'

// loader admin
export const loader = async () => {
    try {
        const response = await customFetch.get('/users/admin/app-stats');// api con la que hacemos la peticion a express
        return response.data;

    } catch (error) {
        toast.error('You are not authorized to view this page');
        return redirect('/dashboard');
    }
};
const Admin = () => {
    const  { users, jobs } = useLoaderData(); // del loader recibido desestructuramos users,jobs
    return (
        <Wrapper>                                                   {/*determinamos la cantidad de users y de jobs, tambien el color de los iconos*/}
            <StatItem tittle='current users' count={users} color='#e9b949' bcg='#fcefc7' icon={<FaSuitcaseRolling/>} />
            <StatItem tittle='total jobs' count={jobs} color='#647acb' bcg='#e0e8f9' icon={<FaCalendarCheck/>} />

        </Wrapper>
    )
};



export default Admin;