import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css'; // para implementar el toastify para notificaciones personalizadas
import './index.css';
import { ToastContainer } from 'react-toastify';   // toastify

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position='top-center'/>  {/* position donde aparecera el toastify(notification)*/}
  </>,
)
