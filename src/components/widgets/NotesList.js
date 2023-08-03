import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material';
import parse from 'html-react-parser';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotesAction } from '../../store/actions/notes-actions';
import { groupBy } from '../../utils/utils-generic-functions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ViewAllModal from './ViewAllModal';


export default function NotesList() {
    const dispatch = useDispatch();
    const { notes } = useSelector( state => state.notes);

    const [noteMap, setNoteMap] = useState(new Map());
    const [expanded, setExpanded] = useState(false);
    const [isViewAll, setIsViewAll] = useState(false);

    const keyGetter = (noteItem) => {
        return moment(noteItem.timestamp).fromNow();
    }

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if(notes && notes.length !== 0) {
            console.log(notes);
            const notesSortByTimestamp = Array.from(notes).sort((a, b) => b.timestamp - a.timestamp);
            setNoteMap(groupBy(notesSortByTimestamp, keyGetter));
        }
    }, [notes])

    useEffect(() => {
        dispatch(getNotesAction());
    }, [dispatch]);


    return (
        <Box>
            <Box sx={{ maxHeight: '400px', overflowY:'scroll' }} className='note-list'>
                {noteMap && [...noteMap.keys()].slice(0, 3).map((noteItemKey, index) => (
                    <Accordion key={`note-list-accordion-${index}`} 
                        expanded={expanded === `note-list-accordion-${index}`}
                        onChange={handleChangeAccordion(`note-list-accordion-${index}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color="secondary" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{fontStyle:'italic', fontWeight:'bold'}}> {noteItemKey} </Typography> 
                        </AccordionSummary>
                        <AccordionDetails>
                            <List sx={{ width: '100%', maxWidth: '400px', bgcolor: 'primary' }}>
                                {noteMap.get(noteItemKey).slice(0, 3).map((note, index) => (
                                    <ListItem key={`note-${noteItemKey}-${index}`} sx={{
                                        borderBottom: '1px solid gray'
                                    }}>
                                        <Box> {parse(note.content)} </Box>                       
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                <Tooltip title="View All">
                    <IconButton color="secondary" aria-label="view all" onClick={() => setIsViewAll(true)}>
                        <RemoveRedEyeOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <ViewAllModal 
                open={isViewAll}
                setIsViewAll={setIsViewAll}
                noteMap={noteMap}
            />
        </Box>
    );

}