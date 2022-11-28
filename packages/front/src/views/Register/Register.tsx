import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ReactComponent as RegisterIcon } from '../../res/svgs/register.svg';

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

const Register = () => {
  const nav = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (data) =>
      axios.post('http://localhost:3006/auth/register', data),
  });

  const successToast = () => toast.success('Registered 🙌');
  const errorToast = () => toast.error('Something went wrong');

  const onSubmit = async (values: any) => {
    registerMutation.mutate(values, {
      onSuccess: (data) => {
        successToast();
        nav('/login');
      },
      onError: (error) => {
        errorToast();
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
        <RegisterIcon className="svgBig" />
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
              <Grid container direction="column" rowSpacing={2}>
                {/* Email field */}
                <Grid item>
                  <TextField
                    fullWidth
                    id="email-input"
                    label="E-mail"
                    variant="outlined"
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
                    variant="outlined"
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
                    Register
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

export default Register;
