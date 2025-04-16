// clase para mostrar contenido del body de la pagina principal
import React from 'react';
import styled from 'styled-components'; // para utilizar herramientas de styled
import { Link } from 'react-router-dom'; // sin este modulo no funcionara toda la pagina porque da error en link
import { Logo } from '../components';   // para utilizar Logo en la parte inferior primero debemos importar sus componentes
import Wrapper from '../assets/wrappers/LandingPage'; // importamos wrapper y sus configuraciones para la pagina
import main    from  '../assets/images/main.svg'


const Landing = () => {
    return(
        <Wrapper>
        <nav>
          <Logo/>    
        </nav>

        <div className='container page'>
            <div className='info'>
                <h1>
                    job <span> tracking </span> app
                </h1>
                <p>
                I'm baby vaporware before they sold out helvetica franzen, seitan photo booth copper mug biodiesel +1 chambray raw denim green juice. Shaman plaid tonx pop-up vape pitchfork solarpunk normcore VHS schlitz 90's. Shoreditch hoodie cornhole whatever. Heirloom small batch 8-bit mumblecore man bun forage literally selfies deep v. Umami 8-bit shabby chic pitchfork, pok pok yuccie shaman gorpcore intelligentsia activated charcoal af. Lo-fi pickled austin shoreditch mukbang cardigan.
                </p>
                <Link to='/register' className='btn register-link'>  {/*boton para registarse*/}
                Register
                </Link>
                <Link to='/login' className='btn'>  {/*boton que nos manda a login*/}
                Login / Demo User
                </Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img' />       {/*imagen main */}
        </div>

        </Wrapper>
    );
};




export default Landing;