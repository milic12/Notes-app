interface StepThreeProps {
  info1: string;
  info2: string;
}

const StepThree = ({ info1, info2 }: StepThreeProps) => {
  return (
    <div>
      <h3>Step 3: Confirm Information</h3>
      <div className="confirmation-details">
        <div className="form-group">
          <label>Information 1:</label>
          <div className="form-value">{info1}</div>
        </div>
        <div className="form-group">
          <label>Information 2:</label>
          <div className="form-value">{info2}</div>
        </div>
      </div>
      <p className="confirmation-text">Click Create Note to save.</p>
    </div>
  );
};

export default StepThree;
