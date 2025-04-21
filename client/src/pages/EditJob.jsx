import React from 'react';
import { FormRow, FormRowSelect,SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
    return {
        queryKey: ['job',id],
        queryFn: async () => {
            const {data} = await customFetch.get(`/jobs/${id}`); // hacemos la solicitud mediante esta api a express 
            return data;  

        }
    }
};


// loader
export const loader = (queryClient) => async ({params}) => {
try {
    await queryClient.ensureQueryData(singleJobQuery(params.id));
    return params.id;
} catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/alljobs');   // por error redireccionamos a la pagina alljobs 
}
};

export const action = (queryClient) => async ({request, params}) => {

    // request.formData() lee los datos enviados por el formulario, por el client en el body , y se los guarda en la variable formData
    const formData = await request.formData();
    const data = Object.fromEntries(formData);     // convierte el object de tipo formData en un object de javascript estandar.

    try {
        await customFetch.patch(`/jobs/${params.id}`,data);   // se hace la solicitud a express mediante esta api
        queryClient.invalidateQueries(['jobs']);    // react query -- invalidate queries
        toast.success('Job edited successfully');
        return redirect('/dashboard/alljobs');

    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }


};



const EditJob = () => {
    const id = useLoaderData();    // recuperamos el object de loader
    const { data:{jobs} } = useQuery(singleJobQuery(id));
  //  console.log(jobs);    // mostramos el object para el debuggin 
    
    return(
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'> edit job </h4>
                <div className='form-center'>
                    <FormRow type='text' name='position' defaultValue={jobs.position} />
                    <FormRow type='text' name='company' defaultValue={jobs.company} />
                    <FormRow type='text' name='jobLocation' labelText='job location' defaultValue={jobs.jobLocation} />

                    <FormRowSelect name='jobStatus' labelText='job status' defaultValue={jobs.jobStatus} list={Object.values(JOB_STATUS)} />
                    <FormRowSelect name='jobType' labelText='job type' defaultValue={jobs.jobType} list={Object.values(JOB_TYPE)} />

                   <SubmitBtn formBtn /> {/* incorporamos el componente button*/}
                
                </div>
            </Form>
        </Wrapper>
        
    )

};

export default EditJob;