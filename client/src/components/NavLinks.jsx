// creamos el componente de la clase links para exportar el array 
import               React            from  'react';
import        {useDashboardContext}   from  '../pages/DashboardLayout'; // importamos el context de la clase dashboarLayout
import            links               from   '../utils/links';    // importamos  el array links 
import         { NavLink }            from  'react-router-dom';

const NavLinks = ({isBigSidebar}) => {

    const {toggleSidebar,user} = useDashboardContext();
    return(
        
        <div className="nav-links">
        {links.map((link)=>{          // usamos el array de links para hacer un recorrido con (map) , sacar sus datos y lo transforma en una lista de componentes NavLink
          const {text,path,icon} = link
          const { role } = user;   // desestructuramos el atributo role del object user
          if(path === 'admin' && role !== 'admin') return; // determinamos que sino es admin no podra ver la pagina de admin, si es user lo redireccionara a dashboard
          return(
            <NavLink to={path} key={text} className='nav-link' onClick={isBigSidebar? null : toggleSidebar} end>   
              <span className='icon'> 
                  {icon}
              </span>
              {text}
            </NavLink>
          );

        })}
        
      </div>



    )
}

export default NavLinks;