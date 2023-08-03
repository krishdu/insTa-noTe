import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        addOrGetNoteRquest: (state, action) => {
            state.loading = true;
        },
        addNoteSuccess: (state, action) => {
            state.loading = false;
            state.notes.unshift(action.payload);
            state.success = true;
        },
        addNoteFail: (state, action) => {
            state.loading = false;
            state.error =  action.payload;
            state.success = false;
        },
        getAllNotesSuccess: (state, action) => {
            state.loading = false;
            state.notes = action.payload;
        },
        getAllNotesFail: (state, action) => {
            state.loading = false;
            state.error =  action.payload;
        },
        clearErrors: (state,action) => {
            state.loading = false;
            state.error = null;
        }
    }
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
