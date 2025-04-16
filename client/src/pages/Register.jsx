//clase para registrar un nuevo usuario
import React from 'react';
import { Form, redirect, Link } from 'react-router-dom';
import  Wrapper   from '../assets/wrappers/RegisterAndLoginPage'  // importamos el Wreapper  para su css 
import { Logo, FormRow, SubmitBtn }   from '../components';  // importamos logo y formato  para implementar la imagen principal, y el formato de la fila del formulario de la clase ForRow
import   customFetch      from '../utils/customFetch.js'  // importamos customFetch para implementar axios
import    { toast }       from 'react-toastify'; // importamos toastyfi para , implementar notificaciones, personalizadas

 
//**** lugar donde recibimos los datos del formulario register *****

                        // recibe un objeto como argumento
export const action = async ({request}) => {
    
    // request.formData() lee los datos enviados por el formulario, por el client en el body , y se los guarda en la variable formData
    const formData = await request.formData();
    const data     = Object.fromEntries(formData); // convierte el object de tipo formData en un object de javascript estandar.
    
    try {   // POST , en authRouter especificamos esta ruta con post.
        await customFetch.post('/auth/register', data); // se hace la solicitud a express mediante esta api
        toast.success('Registration successful'); //*** implementamos el toastyfi y el mensaje que mostrara ***
        return redirect('/login'); // una ves creado el usuario , lo redireccionara al la pagina de login
    } catch (error) {
        toast.error(error?.response?.data?.msg); // mostrata un mensaje toastyfi por defecto , el que determinamos en error
        return error;
    }
    
};

const Register = () => {


    return(       // implementamos Form de react-doom y el metodo en este caso post
        <Wrapper>
          <Form method='post' className='form'>  
            <Logo/>                
            <h4> Register </h4>

            {/* Hacemos uso de la clase FormRow para establecer el formato de la fila del formulario */}
            <FormRow type='text' name='name' />
            <FormRow type='text' name='lastName' labelText='last Name' /> 
            <FormRow type='text' name='location' /> 
            <FormRow type='email' name='email' /> 
            <FormRow type='password' name='password' /> 
                                    
            <SubmitBtn />   {/* implementamos el componente button*/}

            <p>
                Already a member?
                <Link to='/login' className='member-btn'> 
                    Login
                </Link>
            </p>
          </Form>

        </Wrapper>
    );
  
};

export default Register;
