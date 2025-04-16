//clase para mostrar el menu dashboard cuando se minimiza la pagina
import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout'; // llamamos el context que creamos en  la clase dashboardLayout
import { FaTimes }             from 'react-icons/fa';
import      Logo               from  './Logo';
import      links              from  '../utils/links'
import    { NavLink }             from 'react-router-dom';
import       NavLinks          from './NavLinks';



const SmallSidebar = () => {
  const {showSidebar,toggleSidebar} = useDashboardContext();   // utilizamos el context 
 
    
  return (
    <Wrapper>
       <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}> 
        <div className='content'>
            <button type='button' className='close-btn' onClick={toggleSidebar}>
              <FaTimes/>
            </button>
            <header>
              <Logo/>
            </header>
              <NavLinks/>
        </div>

       </div>
    </Wrapper>
  )
}

export default SmallSidebar;