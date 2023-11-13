import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { Company } from "../../../services/comparisonPortal";
import { useState } from "react";

type Props = {
  companies?: Company[];
  onChange: (companies: Company[]) => void;
};
const CompanyInput = ({ companies, onChange }: Props) => {
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const handleDelete = (company: Company) => {
    if (companies) {
      const newCompanies = companies.filter(
        (comp) =>
          !(
            comp.name === company.name && comp.websiteUrl === company.websiteUrl
          )
      );
      onChange(newCompanies);
    }
  };

  const addCompany = () => {
    const company = { name, websiteUrl };
    if (
      companies &&
      !companies.some(
        (comp) =>
          comp.name === company.name && comp.websiteUrl === company.websiteUrl
      )
    ) {
      const newList = [...companies, company];
      onChange(newList);
    }
  };
  return (
    <Box sx={{ marginTop: "30px", flexGrow: 1, overflow: "hidden" }}>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {!!companies?.length &&
          companies.map((company) => (
            <Grid item>
              <Chip
                label={company.name}
                onDelete={() => handleDelete(company)}
              />
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
          id="company_name"
          label="Name"
          value={name}
          sx={{ marginRight: "10px" }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="company_ website"
          label="Website"
          value={websiteUrl}
          sx={{ width: "60%", marginRight: "10px" }}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!name || !websiteUrl}
          onClick={addCompany}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyInput;
