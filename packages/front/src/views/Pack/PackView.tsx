import {
  Card,
  Grid,
  List,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { Pack } from '../../types/PackTypes';
import ListOfPacks from './ListOfPacks';

const PackView = () => {
  const token = useAuthHeader();
  const { data, isLoading } = useQuery('pack', () => {
    return axios
      .get(`http://localhost:3006/pack`, {
        headers: {
          Authorization: token(),
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  });

  return (
    // Main View Container
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      paddingTop={5}
      gap={5}
    >
      {/* Main View Title */}
      <Grid item>
        <Typography color="primary" variant="h4" fontWeight="bold">
          Packs
        </Typography>
      </Grid>
      {/* Pack List Section */}
      <Grid item xs={12}>
        <Card elevation={3}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            gap={5}
          >
            {/* Your packs title */}
            <Grid item xs={12}>
              <Typography color="primary" variant="h6" fontWeight="bold">
                Your packs
              </Typography>
            </Grid>
            {/* List of packs */}
            <Grid item xs={12}>
              <ListOfPacks packs={data} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PackView;
