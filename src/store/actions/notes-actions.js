import { getNotesAsync, saveNoteAsync } from "../../repository/notes-repo";
import { notesActions } from "../slices/notes/notes-slice"

export const saveNoteAction = (noteContent) => async(dispatch) => {
    try{
        dispatch(notesActions.addOrGetNoteRquest());
        const note = await saveNoteAsync(noteContent);
        dispatch(notesActions.addNoteSuccess(note));
    }catch(err) {
        dispatch(notesActions.addNoteFail(err));
    }
}

export const getNotesAction = () => async(dispatch) => {
    try {
        dispatch(notesActions.addOrGetNoteRquest());
        const notes = await getNotesAsync();
        dispatch(notesActions.getAllNotesSuccess(notes));
    } catch (err) {
        console.log(err);
        dispatch(notesActions.getAllNotesFail(err));
    }
}