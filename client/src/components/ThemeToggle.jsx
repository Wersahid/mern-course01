// clase para cambiar de tema con un click
import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';



const ThemeToggle = () => {
    const {isDarkTheme, toggleDarkTheme} = useDashboardContext();

    // logica para cambiar el icono de noche a dia
  return (
    <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme? (<BsFillSunFill className='toggle-icon'/>):(<BsFillMoonFill/>)}
    </Wrapper>
  )
}

export default ThemeToggle