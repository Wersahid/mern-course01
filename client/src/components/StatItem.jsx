// pagina componente de stats
import     React        from 'react'
import     Wrapper      from '../assets/wrappers/StatItem';


const StatItem = ({ count, tittle, icon, color, bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
        <header>
            <span className='count'> {count} </span>
            <span className='icon'> {icon} </span>
        </header>
        <h5 className='tittle'> {tittle} </h5>

    </Wrapper>
  );
};

export default StatItem;