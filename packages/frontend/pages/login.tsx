import React from 'react';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';

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

const login = () => {
  const onSubmit = async (values: Values) => {};

  return (
    <>
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
            <Grid
              direction="column"
              container
              xs={6}
              sx={{ margin: '0 auto' }}
              spacing={2}
            >
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default login;
