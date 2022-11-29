import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AddPackForm from './AddPackForm';
import ListOfPacks from './ListOfPacks';

const PackView = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [activePackId, setActivePackId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const { data, isLoading } = useQuery(
    'pack',
    async () => {
      return axios
        .get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          const activePack = res.data[0]?.owner?.activePack;
          if (activePack) {
            setActivePackId(activePack.id);
          }
          return res.data;
        });
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  );

  return (
    // Main View Container
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      paddingTop={5}
      gap={1}
    >
      {/* Main View Title */}
      <Grid item>
        <Typography color="primary" variant="h4" fontWeight="bold">
          Packs
        </Typography>
      </Grid>

      {/* Pack List Section */}
      <Grid item xs={12} marginX={2}>
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
              <Typography color="primary" variant="h5" fontWeight="bold">
                Your packs
              </Typography>
            </Grid>
            {/* List of packs */}
            <Grid item xs={12}>
              <ListOfPacks
                formVisible={formVisible}
                setFormVisible={setFormVisible}
                activePackId={activePackId}
                isLoading={isLoading}
                packs={data}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Add Pack Section */}
      {formVisible && (
        <Grid item xs={12} marginX={2}>
          <Card elevation={3}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
            >
              {/* Add packs title */}
              <Grid item xs={12}>
                <Typography color="primary" variant="h5" fontWeight="bold">
                  Add pack
                </Typography>
              </Grid>
              {/* Form to add pack */}
              <Grid item xs={12}>
                <AddPackForm />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default PackView;
