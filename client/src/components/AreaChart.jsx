// pagina componente de stats
// configuracion para los graficos estadisticos
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import React from 'react'

const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300} >
       <AreaChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey=''date />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' /> 
       </AreaChart>
    </ResponsiveContainer>
  );
};



export default AreaChartComponent;