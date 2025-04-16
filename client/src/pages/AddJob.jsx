// ESTRUCTURA ADD JOB
import React from 'react';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';  // incorporamos el FormRowSelect , que es un select input
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form,  redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

//action de registro de un job
export const action = async ({ request }) => {
    // request.formData() lee los datos enviados por el formulario, por el client en el body , y se los guarda en la variable formData
      const formData = await request.formData();
      const data= Object.fromEntries(formData);// convierte el object de tipo formData en un object de javascript estandar.
      try {
        await customFetch.post('/jobs',data); // implementamos el axios para completar el url
        toast.success('Job added successfully');  // implementamos el toastyfi para mensaje exitoso
        return redirect('/dashboard/alljobs');      // una ves creado el job , redireccionara al client a la pagina alljobs
      } catch (error) {
          toast.error(error?.response?.data?.msg);   // por error mostrara un mensaje
          return error;
      }
};


const AddJob = () => {
    const {user} = useOutletContext();

     return(
       <Wrapper>
        <Form method='post' className='form'>
          <h4 className='form-title'> add job </h4>
          <div className="form-center">
            <FormRow type='text' name='position' />
            <FormRow type='text' name='company' />
            <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={ user.location } />
            
                            {/*incorporamos los FormRow*/}
            <FormRowSelect labelText='job status' name='jobStatus' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
            <FormRowSelect labelText='job type' name='jobType' defaultValue={JOB_TYPE.PART_TYME} list={Object.values(JOB_TYPE)}/>

            <SubmitBtn formBtn/>   {/* implementamos el componente submitBtn en vez de escribir todo el button*/}

          </div>
        </Form>

       </Wrapper>
     )
};
  
 



export default AddJob;