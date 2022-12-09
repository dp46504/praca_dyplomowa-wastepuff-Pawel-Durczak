import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Tooltip,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Pack } from '../../types/PackTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toast } from 'react-toastify';
import classes from './ListOfPacks.module.css';

interface ListOfPacksType {
  packs: Pack[];
  isLoading: boolean;
  activePackId: number | null;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  formVisible: boolean;
}

const ListOfPacks = ({
  packs,
  isLoading,
  activePackId,
  setFormVisible,
  formVisible,
}: ListOfPacksType) => {
  const queryClient = useQueryClient();
  const [selectedPackId, setSelectedPackId] = useState<null | number>(null);
  const [selectedPackName, setSelectedPackName] = useState<null | string>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const activePackMutation = useMutation({
    mutationKey: 'pack',
    mutationFn: () =>
      axios.patch(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack/setActive/${selectedPackId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: async () => {
      toast.success('Active pack updated');
      queryClient.invalidateQueries(['pack']);
      queryClient.invalidateQueries(['activepack']);
    },
    onError: async () => toast.error('Something went wrong'),
  });

  const deletePackMutation = useMutation({
    mutationKey: 'pack',
    mutationFn: () =>
      axios.delete(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pack/${selectedPackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: async () => {
      queryClient.invalidateQueries(['pack']);
      toast.success('Pack deleted');
    },
    onError: async () => toast.error('Something went wrong'),
  });

  const handleYes = async () => {
    activePackMutation.mutate();
    setDialogOpen(false);
    setSelectedPackId(null);
    setSelectedPackName(null);
  };
  const handleNo = () => {
    setDialogOpen(false);
    setSelectedPackId(null);
    setSelectedPackName(null);
  };

  const handleDelete = () => {
    deletePackMutation.mutate();
    setDialogOpen(false);
    setSelectedPackId(null);
    setSelectedPackName(null);
  };

  const mapToObject = (pack: Pack) => {
    const active = pack.id === activePackId;
    return (
      <Grid
        key={pack.id}
        minWidth="10rem"
        maxWidth="100%"
        item
        xs={5.5}
        sx={{ cursor: 'pointer' }}
      >
        <Tooltip placement="top" title={`${active ? 'Active package' : ''}`}>
          <Paper
            sx={{
              border: pack.id === activePackId ? 2 : 0,
              borderColor: 'primary.main',
            }}
            onClick={() => {
              setSelectedPackId(pack.id);
              setSelectedPackName(pack.name);
              setDialogOpen(true);
            }}
          >
            <Grid container direction="column" alignItems="center" padding={1}>
              {/* Main text */}
              <Grid item>
                <Typography color="primary" fontWeight="bold" variant="body1">
                  {pack.name}
                </Typography>
              </Grid>
              {/* Secondary text */}
              <Grid item>
                <Typography color="primary" variant="caption">
                  {pack.left}/{pack.size}{' '}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Tooltip>
      </Grid>
    );
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="primary" id="alert-dialog-title">
          {selectedPackName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="primary" id="alert-dialog-description">
            Do you want to set this pack as your active pack or delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleYes}>Yes</Button>
          <Button onClick={handleNo} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        sx={{ maxWidth: 'sm' }}
        container
        gap={2}
        justifyContent="space-around"
        alignItems="center"
      >
        {isLoading && <CircularProgress />}
        {packs?.length !== 0 && packs?.map((pack: Pack) => mapToObject(pack))}

        <Grid item xs={9} sx={{ cursor: 'pointer' }}>
          <Paper
            sx={{ textAlign: 'center' }}
            onClick={() => {
              setFormVisible((prev) => !prev);
            }}
          >
            <Tooltip placement="top" title="Add new package">
              <Typography
                color="primary"
                padding={1.9}
                fontWeight="bold"
                variant="h5"
              >
                {formVisible ? '-' : '+'}
              </Typography>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ListOfPacks;
