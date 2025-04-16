//clase de configuracion del login
import React      from 'react';
import { Link, Form , redirect, useActionData, useNavigate}   from 'react-router-dom'; // para poder usar los links
import Wrapper    from '../assets/wrappers/RegisterAndLoginPage'; // importamos el Wreapper para usar su formato css
import { Logo, FormRow, SubmitBtn }   from '../components'; // importamos el logo principal y el formRow de components
import     customFetch     from '../utils/customFetch';
import      {toast}        from  'react-toastify'; // importamos el toastify


export const action = async({ request }) => {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);
   const errors = {msg:''};  // variable de tipo object  , errors

   if(data.password.length < 4){      // si el password es menor a 3 characters
      errors.msg = 'password too short';
      return errors;
   }
   try {
      await customFetch.post('/auth/login',data);
      toast.success('Login successful')   // implementamos el toastyfi
      return redirect('/dashboard')  // si loguea correctamente lo redireccionamos al dashboard

   } catch (error) {
      //toast.error(error?.response?.data?.msg);
      errors.msg = error?.response?.data?.msg;
      return errors;
   }
   
};



const Login = () => {
    const errors = useActionData();     // errors: objeto de errores de validacion de formulario proviene del hook useActionData()
    
    const navigate = useNavigate();

   // para que funcione se debe registrar a la database por postman o tunderClient este userDemo
    // demo user login
    const loginDemoUser = async () => {
      const data = {
         email: 'test@test.com',
         password:'secret123'
      };
      try {
         await customFetch.post('/auth/login', data);
         toast.success('Take a test drive');
         navigate('/dashboard');
      } catch (error) {
         toast.error(error?.response?.data?.msg);
      }

    };

    return(    // Form   metodo POST
       <Wrapper>  
            <Form method='post' className='form'>
                <Logo/>
                <h4>login</h4>
                {errors?.msg && <p style={{color:'red'}}> {errors.msg} </p>}        {/*** esta linea de codigo muestra un mensaje de error en rojo solo cuando existe un mensaje de error ***/}
                <FormRow type='email' name='email' />
                <FormRow type='password' name='password'/>

                  <SubmitBtn/>   {/* implementamos el componente button*/}
                                                                                 {/* button login demo user*/}
                 <button type='button' className='btn btn-block' onClick={loginDemoUser}> 
                    explore the app
                 </button>
                  <p>
                    Not a member yet ?
                   <Link to='/register' className='member-btn'> 
                        Register
                    </Link>
                  </p>

            </Form>
               

       </Wrapper>
        
    )
};

export default Login;