import { Card, Grid, Paper, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MoneyEquivalent = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [money, setMoney] = useState('');
  const equivalent = [
    { money: 2, thing: 'Lollipop' },
    { money: 5, thing: 'Cookies' },
    { money: 10, thing: 'Good cookies' },
    { money: 17, thing: 'Another pack' },
    { money: 30, thing: 'One month of Spotify' },
    { money: 50, thing: 'One month of Netflix' },
    { money: 70, thing: 'Nice T-shirt' },
    { money: 110, thing: 'Neat backpack' },
    { money: 150, thing: 'Some good whisky' },
    { money: 200, thing: 'Good new PS4 game' },
    { money: 250, thing: '1 year of parking subscription' },
    { money: 300, thing: 'Some good keyboard' },
    { money: 350, thing: 'Raspberry pie' },
    { money: 400, thing: 'Pretty good wireless headphones' },
    { money: 450, thing: 'Nice juice maker' },
    { money: 500, thing: 'Audio interface' },
    { money: 550, thing: 'Good microphone' },
    { money: 600, thing: 'Good E-book reader' },
    { money: 650, thing: 'Nice coffee machine' },
    { money: 700, thing: 'MTB Bike' },
    { money: 750, thing: 'Lollipop' },
    { money: 800, thing: 'Expensive Whisky' },
    { money: 850, thing: 'Vacuum cleaner' },
    { money: 900, thing: 'Good smartwatch' },
    { money: 1000, thing: 'Really good microwave' },
    { money: 1100, thing: 'Sound system' },
    { money: 1200, thing: 'Cheap fridge' },
    { money: 1300, thing: 'Air cleaner' },
    { money: 1400, thing: 'GoPro Hero 8' },
    { money: 1500, thing: 'Electric scooter' },
    { money: 1600, thing: 'Good stationary bike' },
    { money: 1700, thing: 'Ergometr' },
    { money: 1800, thing: 'Neat treadmill' },
    { money: 1900, thing: 'Good TV' },
    { money: 2000, thing: 'Good ASG' },
  ];

  const getUserQuery = useQuery({
    queryKey: 'user',
    queryFn: () =>
      axios
        .get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          return setMoney(res.data.wasted);
        }),
  });

  const getEquivalentString = (amount: number) => {
    let closestIndex: number = 0;
    let leastAbs = Number.MAX_VALUE;
    equivalent.forEach((equiv, index: number) => {
      const abs = Math.abs(equiv.money - amount);
      if (abs < leastAbs) {
        closestIndex = index;
        leastAbs = abs;
      }
    });
    return equivalent[closestIndex].thing;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      gap={5}
    >
      {/* money equivalent title */}
      <Grid item>
        <Typography color="primary" variant="h4" fontWeight="bold">
          Wasted money equivalent
        </Typography>
      </Grid>
      <Card sx={{ maxWidth: 1 }}>
        <Grid container gap={0.5} direction="column" alignItems="center">
          <Grid item>
            <Tooltip placement="top" title="Total wasted money">
              <Typography
                sx={{ textAlign: 'center' }}
                color="primary"
                variant="h4"
                fontWeight="bold"
              >
                {parseFloat(money).toFixed(2)}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item>
            <Paper sx={{ maxWidth: 1, padding: '1rem 1rem' }}>
              <Tooltip
                placement="top"
                title="What could you buy with wasted money"
              >
                <Typography
                  sx={{ textAlign: 'center' }}
                  color="primary"
                  variant="h6"
                >
                  {getEquivalentString(parseInt(money))}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default MoneyEquivalent;
