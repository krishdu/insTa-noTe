import { Box, Grid } from "@mui/material";
import CutomClock from './widgets/CutomClock';
import CustomEditor from './widgets/CustomEditor';
import CustomSearch from './widgets/CustomSearch';
import NotesList from './widgets/NotesList.js';

export default function BaseLayout() {
    return (
        <Box padding={'15px'}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingBottom: '10px',
                marginBottom: '15px'
            }}>
                <Box></Box>
                <Box> <CutomClock /> </Box>
                <Box> <CustomSearch /> </Box>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item md={4}>
                    <NotesList />
                </Grid>
                <Grid item md={4}>
                    <CustomEditor />
                </Grid>
                <Grid item md={4}></Grid>
              </Grid>
            </Box>
        </Box>
    );
}