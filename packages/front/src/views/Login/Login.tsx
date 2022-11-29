import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ReactComponent as LoginIcon } from '../../res/svgs/login.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { login, logout } from '../../store/slices/authSlice';
import { useEffect } from 'react';

interface Values {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email field must be an email'),
  password: yup.string().required('Password is reuired'),
});

const Login = () => {
  const nav = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) nav('/');
  }, []);

  const loginMutation = useMutation({
    mutationFn: (data) =>
      axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/auth/login`,
        data,
      ),
  });

  const successToast = () => toast.success("You're in");
  const errorToast = () => toast.error('Something went wrong');

  const onSubmit = async (values: any) => {
    loginMutation.mutate(values, {
      onSuccess: (res) => {
        successToast();
        dispatch(login(res.data.access_token));
        nav('/');
      },
      onError: () => {
        errorToast();
        dispatch(logout());
      },
    });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      marginY={2}
      rowSpacing={4}
    >
      <Grid item>
        <LoginIcon className="svgBig" />
      </Grid>
      <Grid item>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values: Values) => onSubmit(values)}
          validationSchema={validationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid direction="column" container rowSpacing={2}>
                {/* Email field */}
                <Grid item>
                  <TextField
                    fullWidth
                    id="email-input"
                    label="E-mail"
                    variant="filled"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"
                    helperText={props.touched.email ? props.errors.email : ''}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="password-input"
                    label="Password"
                    variant="filled"
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password"
                    helperText={
                      props.touched.password ? props.errors.password : ''
                    }
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" fullWidth variant="contained">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
