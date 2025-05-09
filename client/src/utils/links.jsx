// clase que contendra la configuracion de la barra derecha
import       React          from 'react';
import { IoBarChartSharp }  from 'react-icons/io5';
import { MdQueryStats }     from 'react-icons/md';
import { FaWpforms }        from 'react-icons/fa';
import { ImProfile }        from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [ // creamos un array de objetos (seran los links)
{
   text: 'add job',
   path: '',
   icon: <FaWpforms/>
},
{
    text: 'all jobs',
    path: 'alljobs',
    icon: <MdQueryStats/>
 },
 {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp/>
 },
 {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile/>
 },
 {
    text: 'admin',
    path:  'admin',
    icon: <MdAdminPanelSettings/>
 }

];

// exportamos nuestro array de links
export default links;