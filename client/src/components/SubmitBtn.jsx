// creamos la clase button send la cual exportaremos a las demas clases
import   {useNavigation}   from   'react-router-dom';

const SubmitBtn = ({ formBtn }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return(
        /*desactiva el boton si la condicion isSubmitting es true ,esto evita que el usuario haga click multiples veces mientras se envia el formulario*/       
        <button type='submit' className={`btn btn-block ${formBtn && 'form-btn'}`} disabled={isSubmitting}> 
            { isSubmitting? 'submitting': 'submit'}
        </button>
    );
};

export default SubmitBtn;