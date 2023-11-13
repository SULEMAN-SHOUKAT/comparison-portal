import { Box, Button, Typography } from "@mui/material";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (val: number) => void;
};

const pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const goToPrev = () => {
    onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginTop: "2rem" }}>
      <Button
        disabled={currentPage === 1}
        onClick={goToPrev}
        variant="contained"
      >
        Prev
      </Button>
      <Box
        sx={{
          textAlign: "center",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <Typography>
          page {currentPage} of {totalPages}
        </Typography>
      </Box>
      <Button
        disabled={currentPage === totalPages}
        onClick={goToNext}
        variant="contained"
      >
        Next
      </Button>
    </Box>
  );
};

export default pagination;
