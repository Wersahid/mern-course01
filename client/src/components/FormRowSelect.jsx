// selector input por celda
// selector de tres opciones , pending ,interview,declined
// funciona para cualquier tipo de select input solo debemos definir el name de los input en la ruta '../../../utils/constants.js'
import React from 'react'

const FormRowSelect = ({name, labelText, list, defaultValue='', onChange }) => {
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
      {labelText || name}
    </label>                                                                           {/* $$ auto search $$*/}                   
    <select name={name} id={name} className='form-select' defaultValue={defaultValue} onChange={onChange}>
      {list.map((itemValue) => {
        return(
            <option key={itemValue} value={itemValue}>
                  {itemValue}
            </option>
        );
      })}
    </select>
  </div>
  )
};

export default FormRowSelect;