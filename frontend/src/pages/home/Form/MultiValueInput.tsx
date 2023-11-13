import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { DataSource } from "../../../services/comparisonPortal";
import { useState } from "react";

type Props = {
  values?: string[];
  label: string;
  onChange: (values: DataSource[]) => void;
};
const MultiValueInput = ({ values, onChange, label }: Props) => {
  const [value, setValue] = useState("");

  const handleDelete = (valueToDelete: string) => {
    if (values) {
      const newList = values.filter((val) => !(val === valueToDelete));
      onChange(newList);
    }
  };

  const addValue = () => {
    if (values && !values.some((val) => val === value)) {
      const newList = [...values, value];
      onChange(newList);
    }
  };
  return (
    <Box sx={{ marginTop: "30px", flexGrow: 1, overflow: "hidden" }}>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {!!values?.length &&
          values.map((val) => (
            <Grid item key={val}>
              <Chip label={val} onDelete={() => handleDelete(val)} />
            </Grid>
          ))}
      </Grid>

      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-between",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="data_source"
          label={label}
          value={value}
          sx={{ width: "80%", marginRight: "10px" }}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="contained" disabled={!value} onClick={addValue}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default MultiValueInput;
