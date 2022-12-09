import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import MoneyEquivalent from './MoneyEquivalent';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StatisticView = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 604800000 + 86400000),
  );
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [data, setData] = useState({
    labels: [''],
    datasets: [
      {
        label: '',
        data: [0],
        borderColor: 'rgb(255, 234, 99)',
        backgroundColor: 'rgb(255, 132, 0)',
      },
    ],
  });

  const addDays = (date: Date, days: number) => {
    return new Date(date.getTime() + days * 86400000);
  };

  const dateToFormat = (date: Date) => {
    const newDate = date.toLocaleDateString('pl-PL').split('.');
    newDate.pop();
    return newDate.join('.');
  };

  const setNewDataFromResult = (logs: any) => {
    const labelsArray = [
      dateToFormat(startDate),
      dateToFormat(addDays(startDate, 1)),
      dateToFormat(addDays(startDate, 2)),
      dateToFormat(addDays(startDate, 3)),
      dateToFormat(addDays(startDate, 4)),
      dateToFormat(addDays(startDate, 5)),
      dateToFormat(addDays(startDate, 6)),
    ];

    const quantityArray = [0, 0, 0, 0, 0, 0, 0];
    const wastedArray = [0, 0, 0, 0, 0, 0, 0];

    logs.forEach((log: any) => {
      const indexToPut = labelsArray.indexOf(
        dateToFormat(new Date(log.createdAt)),
      );
      quantityArray[indexToPut] += log.quantity;
      wastedArray[indexToPut] += log.price;
    });

    const newData = {
      labels: labelsArray,
      datasets: [
        {
          label: 'Quantity',
          data: quantityArray,
          borderColor: 'rgb(255, 234, 99)',
          backgroundColor: 'rgb(255, 132, 0)',
        },
        {
          label: 'Money wasted',
          data: wastedArray,
          borderColor: 'rgb(255, 79, 79)',
          backgroundColor: 'rgba(252, 38, 84, 0.5)',
        },
      ],
    };

    setData(newData);
  };

  const dataQuery = useQuery({
    queryKey: 'statistics',
    queryFn: () =>
      axios
        .get(
          `${process.env.REACT_APP_API_URL}:${
            process.env.REACT_APP_API_PORT
          }/log/${startDate.getTime()}/${endDate.getTime()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          setNewDataFromResult(res.data);
        }),
  });

  useEffect(() => {
    dataQuery.refetch();
  }, [startDate, endDate]);

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        text: 'Quantity / Money wasted chart',
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
        },
      },
    },
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={5}
      gap={5}
    >
      {/* Statistics title */}
      <Grid item>
        <Typography color="primary" variant="h4" fontWeight="bold">
          Statistics
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ width: window?.innerWidth > 600 ? 0.6 : 0.9, minHeight: '10rem' }}
      >
        <Line options={options} data={data} />
      </Grid>
      <Grid item xs={12} sx={{ width: 1 }}>
        <MoneyEquivalent />
      </Grid>
    </Grid>
  );
};

export default StatisticView;
