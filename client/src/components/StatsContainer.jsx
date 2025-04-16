// structure  de  los job status  , interview, pending, declined.
import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import Statitem from './StatItem';

const StatsContainer = ( {defaultStats}) => {
   const stats = [
     { 
       tittle: 'pending applications',
       count:   defaultStats?.pending || 0,
       icon:   <FaSuitcaseRolling />,
       color:  '#f59e0b',
       bcg:    '#fef3c7'
     },
     { 
        tittle: 'interviews scheduled',
        count:   defaultStats?.interview || 0,
        icon:   <FaCalendarCheck />,
        color:  '#647acb',
        bcg:    '#e0e8f9'
      },
      { 
        tittle: 'jobs declined',
        count:   defaultStats?.declined || 0,
        icon:   <FaBug/>,
        color:  '#d66a6a',
        bcg:    '#ffeeeee'
      }
   ];

  return (
    <Wrapper>
        { stats.map((item) => {
            return <Statitem key={item.tittle} {...item} />;
        })}
    </Wrapper>
  )
}

export default StatsContainer;