// configuracion de los atributos de object del array jobs (estilos)
import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);



const Job = ({ 
_id,
position,
company,
jobLocation,
jobType,
createAt,
jobStatus
}) => {
  const date = day(createAt).format('MMM Do, YYYY');
  
  return (
    <Wrapper>
      <header>
        <div className='main-icon'> {company.charAt(0)} </div>
        <div className='info'>
           <h5> {position} </h5>
           <p> {company} </p>
          </div>
      </header>
      <div className='content'>
        <div className='content-center'>
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} />
            <JobInfo icon={<FaBriefcase/>} text={jobType} />
             <div className={ `status ${jobStatus}`}> {jobStatus} </div>
        </div>
        <footer className='actions'>
          <Link to={`../editjob/${_id}`} className='btn edit-btn'>   {/* section donde redireccionamos a la ruta editjob*/}
              Edit 
          </Link>
          <Form method='post' action={`../deletejob/${_id}`}>     {/* section donde nos redireccionara a la function deletejob*/}
            <button type='submit' className='btn delete-btn'>
              Delete
             </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}








export default Job;