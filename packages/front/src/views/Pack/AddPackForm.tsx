import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { RootState } from '../../store/store';

interface Values {
  name: string;
  price: number;
  left: number;
  size: number;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup
    .number()
    .required('Price is required')
    .min(0, "Pack can't have negative price"),
  size: yup
    .number()
    .required('Size of the package is required')
    .min(1, "Pack can't have 0 or negative size"),
  left: yup
    .number()
    .required('Number of left cigarettes is required')
    .integer()
    .min(1, 'There must be at least one cigarette left in the package')
    .max(
      yup.ref('size'),
      'Number of cigarettes left must be lesser than pack size',
    ),
});

const AddPackForm = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const token = useSelector((state: RootState) => state.auth.token);

  const packMutation = useMutation({
    mutationKey: 'pack',
    mutationFn: (values: Values) =>
      axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
  });

  const onSubmit = (values: Values) => {
    packMutation.mutate(values, {
      onSuccess: async () => {
        queryClient.invalidateQueries(['pack']);
        toast.success('Pack created');
      },
      onError: async () => toast.error('Something went wrong'),
    });
  };

  return (
    <Grid container>
      <Formik
        initialValues={{
          name: '',
          price: 0,
          left: 0,
          size: 0,
        }}
        onSubmit={(values: Values) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid
              container
              justifyContent="center"
              rowSpacing={2}
              columnSpacing={2}
            >
              {/* Name field */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  variant="filled"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  helperText={props.touched.name ? props.errors.name : ''}
                />
              </Grid>

              {/* Price field */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  variant="filled"
                  type="number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.price}
                  helperText={props.touched.price ? props.errors.price : ''}
                />
              </Grid>

              {/* Size field */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="size"
                  label="Size"
                  name="size"
                  variant="filled"
                  type="number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.size}
                  helperText={props.touched.size ? props.errors.size : ''}
                />
              </Grid>

              {/* Left field */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="left"
                  label="Left"
                  name="left"
                  variant="filled"
                  type="number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.left}
                  helperText={props.touched.left ? props.errors.left : ''}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default AddPackForm;
