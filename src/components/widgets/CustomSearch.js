import { Box, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

export default function CustomSearch() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', position: 'fixed'}}>
            <GoogleIcon sx={{ mb: -6, mr: 3 }} color='primary'/>
            <TextField label="Google Search" color="primary"  margin="dense"/>
        </Box>
    );
}