interface StepOneProps {
  info1: string;
  setInfo1: (value: string) => void;
}

const StepOne = ({ info1, setInfo1 }: StepOneProps) => {
  return (
    <div>
      <h3>Step 1: Enter Info 1</h3>
      <div className="form-group">
        <textarea
          id="info1"
          className="form-control"
          value={info1}
          onChange={(e) => setInfo1(e.target.value)}
          placeholder="Enter Info 1"
          rows={5}
          required
        />
      </div>
    </div>
  );
};

export default StepOne;
