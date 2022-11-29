import {
  Grid,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SmokingRoomsRoundedIcon from '@mui/icons-material/SmokingRoomsRounded';

import { Pack } from '../../types/PackTypes';
import { useCallback } from 'react';

interface ListOfPacksType {
  packs: Pack[];
}

const ListOfPacks = ({ packs }: ListOfPacksType) => {
  const mapToObject = useCallback((pack: Pack) => {
    return (
      <Grid item xs={5.5}>
        <Paper key={pack.id}>
          <ListItem>
            <ListItemIcon>
              <SmokingRoomsRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={pack.name}
              secondary={`${pack.left}/${pack.size}`}
            />
          </ListItem>
        </Paper>
      </Grid>
    );
  }, []);

  return (
    <Grid container justifyContent="space-evenly" gap={1}>
      {packs?.length !== 0 && packs?.map((pack: Pack) => mapToObject(pack))}
    </Grid>
  );
};

export default ListOfPacks;
