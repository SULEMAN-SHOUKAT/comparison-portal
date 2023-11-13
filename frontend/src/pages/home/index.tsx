import NavBar from "../../components/NavBar";
import ConfigurationForm from "./Form";
import useConfigs from "../../hooks/useConfigs";
import usePagination from "../../hooks/usePagination";
import { Box } from "@mui/material";
import ConfigurationsList from "./List";

const Home = () => {
  const { page, pageSize, onPageChange } = usePagination();
  const { data: configs } = useConfigs({ page, pageSize });

  return (
    <Box>
      <NavBar />
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "3rem" }}
      >
        <Box sx={{ width: "8%" }}>
          <ConfigurationForm buttonTitle="New" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", padding: "3rem" }}>
        {configs && (
          <ConfigurationsList
            configurations={configs}
            currentPage={page}
            onPageChange={onPageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
