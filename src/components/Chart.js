import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Gráfico de evolución del peso registrado en este ejercicio por fecha',
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1
};

export const Chart = ({ chartData }) => {
  chartData.reverse()
  const data = {
    labels: chartData.map((char) => Moment(char.createdAt).format('DD-MM-YYYY')),
    datasets: [{
      label: 'Peso(Kg) registrado a esta fecha',
      backgroundColor: 'rgb(220, 26, 34)',
      borderColor: 'rgb(220, 26, 34)',
      data: chartData.map((char) => char.quantity_kg)
    }]
  };
  return (
    <div>
      <Line
        data={data}
        options={options
        }
      />
    </div>
  );
};