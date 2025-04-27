import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
  resetForm,
  selectCurrentStep,
  selectInfo1,
  selectInfo2,
  selectIsEditMode,
  selectNoteId,
  setInfo1,
  setInfo2,
  editMode,
} from "../redux/features/noteSlice";
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useGetNoteQuery,
} from "../redux/services/notesApi";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";

const NoteEditor = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentStep = useSelector(selectCurrentStep);
  const info1 = useSelector(selectInfo1);
  const info2 = useSelector(selectInfo2);
  const isEditMode = useSelector(selectIsEditMode);
  const currentNoteId = useSelector(selectNoteId);

  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  // edit mode
  const { data: noteData } = useGetNoteQuery(parseInt(noteId || "0", 10), {
    skip: !noteId,
  });

  useEffect(() => {
    if (noteId && noteData && !isEditMode) {
      dispatch(
        editMode({
          noteId: noteData.id,
          info1: noteData.info1,
          info2: noteData.info2,
        })
      );
    }

    return () => {
      dispatch(resetForm());
    };
  }, [noteId, noteData, dispatch]);

  const handleNextStep = () => {
    if (currentStep < 3) {
      dispatch(nextStep());
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      dispatch(previousStep());
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && currentNoteId) {
        await updateNote({
          id: currentNoteId,
          info1,
          info2,
        }).unwrap();
      } else {
        await createNote({
          info1,
          info2,
        }).unwrap();
      }

      dispatch(resetForm());
      navigate("/");
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            info1={info1}
            setInfo1={(value) => dispatch(setInfo1(value))}
          />
        );
      case 2:
        return (
          <StepTwo
            info2={info2}
            setInfo2={(value: string) => dispatch(setInfo2(value))}
          />
        );
      case 3:
        return <StepThree info1={info1} info2={info2} />;
      default:
        return null;
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div>
      <h2>{isEditMode ? "Edit Note:" : "Create Note:"}</h2>

      <div className="editor-content">{renderStepContent()}</div>

      <div className="editor-actions">
        {currentStep > 1 && (
          <button
            className="btn btn-secondary"
            onClick={handlePreviousStep}
            disabled={isLoading}
          >
            Back
          </button>
        )}

        {currentStep < 3 ? (
          <button
            className="btn btn-primary"
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !info1) ||
              (currentStep === 2 && !info2) ||
              isLoading
            }
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : isEditMode
              ? "Update Note"
              : "Create Note"}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
