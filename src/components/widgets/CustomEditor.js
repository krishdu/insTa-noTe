import { Box } from "@mui/system";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveNoteAction } from "../../store/actions/notes-actions";

export default function CustomEditor() {
	const dispatch = useDispatch();
    const editor  = useRef(null);
    const [content, setContent] = useState('');
	const { success } = useSelector(state => state.notes);
    const config = {
		readonly: false,
		placeholder: 'Start typings...',
		height: 350,
		allowResizeX: false,
		allowResizeY: false
	};

	const saveNoteHandler = () => {
		if(content && content !== '<p><br></p>') {
			dispatch(saveNoteAction(content));
		}else{
			alert('No content');
			//later replace with toast notification
		}
	}

    useEffect(() => {
        setContent('');
    }, [success]);

    return (
		<Box sx={{
			display:'flex',
			alignItems:'center', 
			justifyContent: 'center',
			flexDirection: 'column',
		}}>
        <JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)}
			onChange={newContent => {}}
		/>
		<Box>
		<Button variant="outlined"
			color="primary"
			sx={{ mt:2 }}
			startIcon={<SaveOutlinedIcon />}
			onClick={saveNoteHandler}
		>
  			Save
		</Button>
		</Box>
		</Box>
    );
}