import React from 'react';
import customFetch from '../utils/customFetch';
import  {toast}    from  'react-toastify';
import  { redirect }  from  'react-router-dom';

// con esta action hacemos delete de job
export const action = async({params}) => {

    try {
     await customFetch.delete(`/jobs/${params.id}`); // hacemos la solicitud a express mediante esta api
     toast.success('Job deleted successfully');

    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/alljobs')
};


const DeleteJobs = () => {
    return(

        <h1> Delete Jobs Page </h1>
    )
};

export default DeleteJobs;