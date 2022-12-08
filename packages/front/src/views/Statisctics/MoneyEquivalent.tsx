import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MoneyEquivalent = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [money, setMoney] = useState('');

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
          Money equivalent
        </Typography>
      </Grid>
      <Grid item>{money}</Grid>
    </Grid>
  );
};

export default MoneyEquivalent;
