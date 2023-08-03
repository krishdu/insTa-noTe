import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';
import { useState } from "react";

export default function ViewAllModal({open, setIsViewAll, noteMap}) {

    const [expanded, setExpanded] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        pt: 2,
        px: 4,
        pb: 3,
      };
      
    const handleClose = () => {
        setIsViewAll(false);
    }

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="all-notes"
        aria-describedby="modal-view-notes"
      >
        <Box sx={{ ...style, width: '70%', maxHeight: '400px', overflowY:'scroll' }} className='note-list'>
            {noteMap && [...noteMap.keys()].map((noteItemKey, index) => (
                <Accordion key={`note-list-modal-accordion-${index}`} 
                    expanded={expanded === `note-list-modal-accordion-${index}`}
                    onChange={handleChangeAccordion(`note-list-modal-accordion-${index}`)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="secondary"/>}
                        aria-controls="panel1a-modal-content"
                        id="panel1a-modal-header"
                    >
                        <Typography sx={{fontStyle:'italic', fontWeight:'bold'}}> {noteItemKey} </Typography> 
                    </AccordionSummary>
                    <AccordionDetails>
                        {noteMap.get(noteItemKey).map((note, index) => (
                            <Accordion key={`note-${noteItemKey}-${index}`}>
                                <AccordionDetails>
                                    {parse(note.content)}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
      </Modal>
    )
}