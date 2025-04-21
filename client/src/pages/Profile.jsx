import React from 'react';
import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { redirect, useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// action profile
export const action = (queryClient) => async({request}) => {
    // extrae los datos del formulario que se envio
    const formData = await request.formData();
   //Obtiene el archivo que el usuario subió con el nombre "avatar" (por ejemplo, una imagen de perfil).Si no se envió nada, file será null.
    const file = formData.get('avatar');
    if(file && file.size > 500000){
        toast.error('Image size too large');
        return null;
    };
    try {
        //'/users/update-user': es la ruta del backend en Express que va a recibir y procesar la actualización, formData es el cuerpo que contiene los nuevos datos del client
        await customFetch.patch('/users/update-user', formData); // api mediante la cual realizara la peticion a expres (metodo patch)
        queryClient.invalidateQueries(['user']);        // react query invalidate
        toast.success('Profile updated successfully');
        return redirect('/dashboard');                // react query  invalidate

    } catch (error) {
        toast.error(error?.response?.data?.msg);     
        return null;  
    }
    
};

const Profile = () => {
    const { user } = useOutletContext();
    const { name, lastName, email, location } = user;

    return(
        <Wrapper>                                   {/* important */}
            <Form method='post' className='form' encType='multipart/form-data'>
            <h4 className='form-title'> profile </h4>

            <div className='form-center'>   
                <div className='form-row'>
                    <label htmlFor='avatar' className='form-label'>
                        Select an image file (max 0.5 MB):
                    </label>
                    <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*'/>
                </div>
                <FormRow type='text' name='name' defaultValue={name} />
                <FormRow type='text' labelText='last name' name='lastName' defaultValue={lastName} />
                <FormRow type='email' name='email' defaultValue={email}/>
                <FormRow type='text'  name='location' defaultValue={location}/>
                
                <SubmitBtn formBtn/>

            </div>
            </Form>
        </Wrapper>
    );
};

export default Profile;