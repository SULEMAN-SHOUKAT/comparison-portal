import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ConfigurationForm from "../Form";

import { Configuration } from "../../../services/comparisonPortal";
import useMutateConfig from "../../../hooks/useMutateConfig";

type Props = {
  configuration: Configuration;
};

const GridItems = (items: string[], title: string) => {
  return (
    <Box
      sx={{
        maxHeight: "10rem",
        minHeight: "10rem",
        overflowY: "scroll",
        padding: "5px",
        borderRight: "1px solid #c7c7c7a8",
      }}
      className="xs-scroll-bar"
    >
      <Box
        sx={{
          borderBottom: "1px solid #c7c7c7a8",
          marginBottom: "12px",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {!!items?.length &&
          items.map((item) => (
            <Grid item key={item}>
              <Chip
                label={item}
                variant="outlined"
                sx={{ borderRadius: "4px" }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
const ConfigurationItem = ({ configuration }: Props) => {
  const { deleteConfig } = useMutateConfig();

  const handleDeleteConfig = async () => {
    await deleteConfig.mutate(configuration._id as string);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "2rem",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          {configuration.companies &&
            GridItems(
              configuration.companies.map((comp) => comp.name),
              "Companies"
            )}
        </Grid>
        <Grid item lg={3} xs={12}>
          {configuration.dataSources &&
            GridItems(configuration.dataSources, "Data Sources")}
        </Grid>
        <Grid item lg={4} xs={12}>
          {configuration.questions &&
            GridItems(configuration.questions, "Questions")}
        </Grid>
        <Grid
          item
          lg={1}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <ConfigurationForm buttonTitle="Edit" confgiuration={configuration} />
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteConfig}
            sx={{ marginTop: "8px", width: "100%" }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigurationItem;
