//clase para realizar el navbar de la pagina
import        React          from 'react';
import      Wrapper          from '../assets/wrappers/Navbar';
import  { FaAlignLeft }      from  'react-icons/fa';
import       Logo            from './Logo'; // importamos la clase logo para utilizarla en la parte superior
import      {useDashboardContext}   from  '../pages/DashboardLayout';   // importamos la clase context de la clase  dashboardLayout
import      LogoutContainer   from    './LogoutContainer';
import         ThemeToggle    from './ThemeToggle';

const Navbar = () => {

  const {toggleSidebar}  = useDashboardContext(); // creamos una constante para utilizar el context importado de la clase dashboardLayout

  return (
    <Wrapper>
        <div className='nav-center'> 
            <button type='button' className='toggle-btn' onClick={toggleSidebar}>
        
            <FaAlignLeft/>
            </button>  
            <div>
              <Logo/>
              <h4 className='logo-text'> dashboard </h4>
            </div>
            <div className='btn-container'>

              <ThemeToggle/>
              <LogoutContainer/>
            </div>
        </div>
        
    </Wrapper>
  )
}

export default Navbar;