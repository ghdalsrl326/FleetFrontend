import { Box, Container, Typography, Alert, Snackbar } from "@mui/material";
import LocationsTable from "./LocationsTable";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { LocationsFilter } from "../../types/location";

const FleetDashboard = () => {
  const [filter, setFilter] = useState<LocationsFilter>({
    page: 0,
    location_name: "",
    robot_id: "",
    is_starred: false,
  });

  const [viewType, setViewType] = useState<"all" | "starred">("all");
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (newFilter: Partial<LocationsFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
      is_starred: viewType === "starred",
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Fleet
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SearchBar
          onFilterChange={handleFilterChange}
          // onViewTypeChange={setViewType}
          // viewType={viewType}
        />
      </Box>
      <LocationsTable
        filter={filter}
        onFilterChange={handleFilterChange}
        // onError={setError}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default FleetDashboard;
