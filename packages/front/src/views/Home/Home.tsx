import { Button, Card, Grid, Paper, Tooltip, Typography } from '@mui/material';
import FlipNumbers from 'react-flip-numbers';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';
import classes from './Home.module.css';
import { useState } from 'react';
import theme from '../../Theme/theme';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const queryClient = useQueryClient();
  const [secondsClean, setSecondsClean] = useState<number>(0);
  const theme = useTheme();

  const getTimeSinceString = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = new Date(Math.abs(now - past));
    const days = (diff.getTime() / 1000 / 60 / 60 / 24).toFixed(0);
    return `${days}:${diff.getHours()}:${diff.getMinutes()}.${diff.getSeconds()}`;
  };

  const getDaysString = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = new Date(Math.abs(now - past));
    return (diff.getTime() / 1000 / 60 / 60 / 24).toFixed(0).toString();
  };

  const getHoursString = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = new Date(Math.abs(now - past));
    return diff.getHours() - 1;
  };

  const getMinutesString = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = new Date(Math.abs(now - past));
    const value = diff.getMinutes();
    if (value < 10) return `0${value}`;
    return value;
  };
  const getSecondsString = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = new Date(Math.abs(now - past));
    const value = diff.getSeconds();
    if (value < 10) return `0${value}`;
    return value;
  };

  const getSecondsSince = (pastDate: Date) => {
    const now = new Date(Date.now()).getTime();
    const past = new Date(pastDate).getTime();
    const diff = Math.abs(now - past);
    return Math.floor(new Date(diff).getTime() / 1000) - 1200;
  };

  const token = useSelector((state: RootState) => state.auth.token);
  const nav = useNavigate();
  const timer = setInterval(() => {
    setSecondsClean((prev) => prev + 1);
  }, 1);

  const { data, isLoading } = useQuery({
    queryKey: 'activepack',
    queryFn: () => {
      return axios
        .get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack/active`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          return res.data;
        });
    },
  });

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
          setSecondsClean(getSecondsSince(res.data.lastSmoked));
          return res.data;
        }),
  });

  const minusOneMutation = useMutation({
    mutationKey: 'activepack',
    mutationFn: (payload: { left: number }) =>
      axios.patch(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack/${data.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      toast.success(`-1 from ${data.name}`);
      queryClient.invalidateQueries(['activepack']);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['pack']);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const handleMinusOne = () => {
    minusOneMutation.mutate({ left: data.left - 1 });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      gap={5}
    >
      {/* Active Pack */}
      <Grid item xs={12} marginX={2} sx={{ width: 'sm' }}>
        <Card elevation={3}>
          <Grid container direction="column" gap={1} alignItems="center">
            {/* Active pack title */}
            <Grid item>
              <Typography color="primary" variant="h5" fontWeight="bold">
                Active pack
              </Typography>
            </Grid>
            {!isLoading && !data && (
              <>
                <Grid item>
                  <Typography color="primary.main" variant="h5">
                    You don't have active pack set
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    color="primary.dark"
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    variant="h6"
                    onClick={() => {
                      nav('/pack');
                    }}
                  >
                    Set Active Pack
                  </Typography>
                </Grid>
              </>
            )}
            {data && !isLoading && (
              <>
                <Grid item>
                  <Paper>
                    <Grid
                      container
                      justifyContent="center"
                      padding={2}
                      alignItems="center"
                      gap={3}
                    >
                      {/* Left side of active pack smallboard */}
                      <Grid item xs={6}>
                        <Grid container direction="column">
                          {/* Pack name */}
                          <Grid item>
                            <Tooltip
                              placement="top"
                              title="Name of the active package"
                            >
                              <Typography
                                color="primary"
                                fontWeight="bold"
                                variant="h6"
                              >
                                {data.name}
                              </Typography>
                            </Tooltip>
                          </Grid>
                          {/* Cost per one */}
                          <Grid item>
                            <Typography color="primary" variant="caption">
                              {(data.price / data.size).toFixed(2)} PLN per one
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* Right side of active pack smallboard */}
                      <Grid item xs={4}>
                        <Card sx={{ marginTop: 0 }}>
                          <Grid container gap={1}>
                            {/* Pack left value */}
                            <Grid item xs={12}>
                              <Tooltip placement="top" title="Quantity left">
                                <Typography
                                  sx={{ textAlign: 'center' }}
                                  fontWeight="bold"
                                  color="primary.light"
                                >
                                  {data.left}
                                </Typography>
                              </Tooltip>
                            </Grid>
                            <div className={classes.divider}></div>
                            {/* Pack size value */}
                            <Grid item xs={12}>
                              <Tooltip
                                placement="top"
                                title="Original pack size"
                              >
                                <Typography
                                  sx={{ textAlign: 'center' }}
                                  color="primary.dark"
                                  fontWeight="bold"
                                >
                                  {data.size}
                                </Typography>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>

                      {/* Button */}
                      <Grid item xs={12}>
                        <Tooltip placement="top" title="Smoke one">
                          <Button
                            onClick={handleMinusOne}
                            variant="contained"
                            fullWidth
                          >
                            <Typography fontWeight="bold" variant="subtitle1">
                              -1
                            </Typography>
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </Grid>

      {/* Money wasted counter */}
      <Tooltip placement="top" title="Total of wasted money">
        <Grid
          item
          xs={12}
          sx={{ width: 1, color: theme.palette.primary.main }}
          className={classes.wastedContainer}
        >
          <FlipNumbers
            height={60}
            width={50}
            color={theme.palette.primary.main}
            background="transparent"
            play
            perspective={600}
            numbers={`${
              getUserQuery?.data?.wasted?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || 0
            } PLN`}
          />
        </Grid>
      </Tooltip>

      {/* Time clean counter */}
      {getUserQuery?.data?.lastSmoked && (
        <Tooltip placement="top" title="Time since last cigarette">
          <Card sx={{ width: 0.7, maxWidth: 'sm', margin: '0 2rem' }}>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  sx={{ textAlign: 'center' }}
                  variant="h4"
                  fontWeight="bold"
                  color="primary.light"
                >
                  {getDaysString(getUserQuery?.data?.lastSmoked)} Days
                </Typography>
              </Grid>
              {/* Horizontal container */}
              <Grid item>
                <Grid
                  container
                  gap={1.5}
                  sx={{ width: 1 }}
                  justifyContent="space-between"
                >
                  {/* Hours */}
                  <Grid item xs={3} sx={{ width: 1 }}>
                    <Paper>
                      <Grid
                        container
                        gap={2}
                        alignItems="center"
                        direction="column"
                      >
                        {/* Up */}
                        <Grid item>
                          <Typography
                            color="primary.light"
                            fontWeight="bold"
                            variant="h4"
                          >
                            {getHoursString(getUserQuery?.data?.lastSmoked)}
                          </Typography>
                        </Grid>
                        {/* Down */}
                        <Grid item>
                          <Typography
                            color="primary"
                            fontWeight="bold"
                            variant="h6"
                          >
                            H
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  {/* Minutes */}
                  <Grid item xs={3} sx={{ width: 1 }}>
                    <Paper>
                      <Grid
                        container
                        gap={2}
                        alignItems="center"
                        direction="column"
                      >
                        {/* Up */}
                        <Grid item>
                          <Typography
                            color="primary.light"
                            fontWeight="bold"
                            variant="h4"
                          >
                            {getMinutesString(getUserQuery?.data?.lastSmoked)}
                          </Typography>
                        </Grid>
                        {/* Down */}
                        <Grid item>
                          <Typography
                            color="primary"
                            fontWeight="bold"
                            variant="h6"
                          >
                            M
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  {/* Seconds */}
                  <Grid item xs={3} sx={{ width: 1 }}>
                    <Paper>
                      <Grid
                        container
                        gap={2}
                        alignItems="center"
                        direction="column"
                      >
                        {/* Up */}
                        <Grid item>
                          <Typography
                            color="primary.light"
                            fontWeight="bold"
                            variant="h4"
                          >
                            {getSecondsString(getUserQuery?.data?.lastSmoked)}
                          </Typography>
                        </Grid>
                        {/* Down */}
                        <Grid item>
                          <Typography
                            color="primary"
                            fontWeight="bold"
                            variant="h6"
                          >
                            S
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Tooltip>
      )}
    </Grid>
  );
};
export default Home;
