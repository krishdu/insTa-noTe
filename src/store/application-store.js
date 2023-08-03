import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notes/notes-slice";

const applicationStore = configureStore({
    reducer: {
        notes: notesReducer 
    }
});

export default applicationStore;