import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NoteState {
  currentStep: number;
  isEditMode: boolean;
  noteId?: number;
  info1: string;
  info2: string;
}

const initialState: NoteState = {
  currentStep: 1,
  isEditMode: false,
  info1: "",
  info2: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setInfo1: (state, action: PayloadAction<string>) => {
      state.info1 = action.payload;
    },

    setInfo2: (state, action: PayloadAction<string>) => {
      state.info2 = action.payload;
    },

    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },

    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    resetForm: () => initialState,

    editMode: (
      state,
      action: PayloadAction<{ noteId: number; info1: string; info2: string }>
    ) => {
      state.isEditMode = true;
      state.noteId = action.payload.noteId;
      state.info1 = action.payload.info1;
      state.info2 = action.payload.info2;
      state.currentStep = 1;
    },
  },
});

export const {
  setInfo1,
  setInfo2,
  nextStep,
  previousStep,
  resetForm,
  editMode,
} = noteSlice.actions;

export const selectNoteForm = (state: RootState) => state.note;
export const selectCurrentStep = (state: RootState) => state.note.currentStep;
export const selectInfo1 = (state: RootState) => state.note.info1;
export const selectInfo2 = (state: RootState) => state.note.info2;
export const selectIsEditMode = (state: RootState) => state.note.isEditMode;
export const selectNoteId = (state: RootState) => state.note.noteId;

export default noteSlice.reducer;
