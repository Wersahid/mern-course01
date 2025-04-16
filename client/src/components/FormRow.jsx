// clase para crear la fila de un formalario predeterminado
import React from 'react';  

// con esto creamos el formato , tipo , nombre, de la fila de un formulario.
const FormRow = ({type, name, labelText,defaultValue, onChange}) => {
  
    return(
        <div className='form-row'>
             <label htmlFor={name} className='form-label'>   
                {labelText || name}
            </label>
            <input 
             type={type}
             id={name}
             name={name} 
             className='form-input' 
             defaultValue={defaultValue || ''}
             onChange= {onChange}   // $$$ auto search $$$
             required/>
        </div>
    )
    
}

// exportamos la fila de un formulario predeterminado
export default FormRow;