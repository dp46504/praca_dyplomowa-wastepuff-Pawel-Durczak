import {
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RootState } from '../../store/store';
import classes from './Home.module.css';

const Home = () => {
  const queryClient = useQueryClient();

  const token = useSelector((state: RootState) => state.auth.token);
  const nav = useNavigate();

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
        .then((res) => res.data),
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
    <Grid container direction="column" gap={3} alignItems="center">
      <Grid item>
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
                            <Typography
                              color="primary"
                              fontWeight="bold"
                              variant="h6"
                            >
                              {data.name}
                            </Typography>
                          </Grid>
                          {/* Cost per one */}
                          <Grid item>
                            <Typography color="primary" variant="caption">
                              {data.price / data.size} PLN per one
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
                              <Typography
                                sx={{ textAlign: 'center' }}
                                fontWeight="bold"
                                color="primary.light"
                              >
                                {data.left}
                              </Typography>
                            </Grid>
                            <div className={classes.divider}></div>
                            {/* Pack size value */}
                            <Grid item xs={12}>
                              <Typography
                                sx={{ textAlign: 'center' }}
                                color="primary.dark"
                                fontWeight="bold"
                              >
                                {data.size}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>

                      {/* Button */}
                      <Grid item xs={12}>
                        <Button
                          onClick={handleMinusOne}
                          variant="contained"
                          fullWidth
                        >
                          <Typography fontWeight="bold" variant="subtitle1">
                            -1
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            padding: '3rem 10rem',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          {getUserQuery?.data?.wasted?.toFixed(2)}
          {!getUserQuery?.data?.wasted && (
            <Typography>
              You didn't lost any money because of your habit
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
// {getUserQuery?.data?.wasted.toFixed(2)}
export default Home;
