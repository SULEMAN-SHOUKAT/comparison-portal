import { Box } from "@mui/material";
import { ConfigQueryResponse } from "../../../services/comparisonPortal";
import ConfigurationItem from "./Configurations";
import Pagination from "./Pagination";

type Props = {
  configurations: ConfigQueryResponse;
  currentPage: number;
  onPageChange: (val: number) => void;
};

const ConfigurationsList = ({
  configurations,
  currentPage,
  onPageChange,
}: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      {!!configurations?.data &&
        configurations.data.map((conf) => (
          <ConfigurationItem key={conf._id} configuration={conf} />
        ))}
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={configurations.totalPages}
      />
    </Box>
  );
};

export default ConfigurationsList;
