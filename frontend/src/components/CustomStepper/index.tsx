import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

type Props = {
  steps: string[];
  activeStep: number;
  skipped: number[];
};
const CustomStepper = ({ steps, activeStep, skipped }: Props) => {
  const isStepSkipped = (step: number) => {
    return skipped.includes(step);
  };

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CustomStepper;
