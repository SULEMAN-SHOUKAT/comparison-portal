import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CustomStepper from "../../../components/CustomStepper";
import CompanyInput from "./CompanyInput";
import MultiValueInput from "./MultiValueInput";
import {
  Company,
  DataSource,
  Question,
} from "../../../services/comparisonPortal";
import useMutateConfig from "../../../hooks/useMutateConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const steps = ["Add companies", "Add sources", "Add questions"];

type Props = {
  buttonTitle: string;
};
const ConfigurationForm = ({ buttonTitle }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState<number[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const configMutation = useMutateConfig();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isStepSkipped = (step: number) => {
    return skipped.includes(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = newSkipped.filter((st) => st !== activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = async () => {
    await configMutation.mutate({ companies, questions, dataSources });
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isNextStepEnable = () => {
    if (activeStep === 0) return !!companies?.length;
    if (activeStep === 1) return !!dataSources?.length;
    if (activeStep === 2) return !!questions?.length;
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CustomStepper
            activeStep={activeStep}
            skipped={skipped}
            steps={steps}
          />
          <Box>
            {activeStep === 0 && (
              <CompanyInput onChange={setCompanies} companies={companies} />
            )}
            {activeStep === 1 && (
              <MultiValueInput
                onChange={setDataSources}
                values={dataSources}
                label="Data Source"
              />
            )}
            {activeStep === 2 && (
              <MultiValueInput
                onChange={setQuestions}
                values={questions}
                label="Questions"
              />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={async () => {
                if (activeStep === steps.length - 1) {
                  await handleSubmit();
                } else {
                  handleNext();
                }
              }}
              disabled={!isNextStepEnable()}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ConfigurationForm;
