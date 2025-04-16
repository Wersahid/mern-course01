// clase para mostrar  error , predeterminado 
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import  Wrapper  from '../assets/wrappers/ErrorPage'; // importamos el wrapper para esta pagina
import  img      from  '../assets/images/not-found.svg'; // importamos la imagen para esta pagina



const Error = () => {
    const error = useRouteError();  
    
    // en caso de status 404 mostraremos mensajes y se utilizara la imagen
    if(error.status === 404){ 
        return(
            <Wrapper>
                <div>
                    <img src={ img } alt="not found" />
                    <h3> Ohh! page not found </h3>
                    <p> We can't seem to find the page you are  looking for </p>
                    <Link to='/dashboard'>back home </Link>
                </div>
            </Wrapper>
        )

    }

    return(
        <Wrapper>
        <div>
            <h3> Something went wrong</h3>
        </div>

        </Wrapper> // mensaje que sera mostrado en caso de error de url
    )
};

export default Error;