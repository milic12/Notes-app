interface StepTwoProps {
  info2: string;
  setInfo2: (value: string) => void;
}

const StepTwo = ({ info2, setInfo2 }: StepTwoProps) => {
  return (
    <div>
      <h3>Step 2: Enter Info 1</h3>
      <div className="form-group">
        <textarea
          id="info2"
          className="form-control"
          value={info2}
          onChange={(e) => setInfo2(e.target.value)}
          placeholder="Enter info2"
          rows={5}
          required
        />
      </div>
    </div>
  );
};

export default StepTwo;
