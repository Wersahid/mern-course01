import React from 'react'
import { Outlet } from 'react-router-dom';

const homeLayout = () => {
  return (
    <>
        {/* <nav>Home Layout , is this it Outlet </nav>   se aplicara a estas dos lineas de codigo a las rutas hijas */}
        {/* <h1>Home Layout page</h1> */}
        <Outlet/>

    </>
  )
};

export default homeLayout;