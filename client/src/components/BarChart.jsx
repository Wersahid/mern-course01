// pagina componente de stats
// configuracion para los graficos estadisticos
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React from 'react'

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={ 300 }>
       <BarChart data={data} margin={{ top: 50}}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date'  />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#2cb1bc' barSize={ 75 }/>
       </BarChart>
    </ResponsiveContainer>
  );
};



export default BarChartComponent;