import Clock from 'react-live-clock';
import { useTheme } from '@mui/material/styles';

export default function CutomClock() {
    const theme = useTheme();

    return <Clock
        format={'h:mm:ss A'}
        style={{fontSize: '3em', color: `${theme.palette.primary.main}`}}
        ticking={true}
        timezone='Asia/Kolkata'
    />;
}