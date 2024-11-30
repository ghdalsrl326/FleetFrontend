import { Box, Container, Typography, Alert, Snackbar } from "@mui/material";
import LocationsTable from "components/FleetDashboard/LocationsTable";
import SearchBar from "components/FleetDashboard/SearchBar";
import { useState, useMemo } from "react";
import { LocationsFilter } from "types/location";

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
    }));
  };

  const currentFilter = useMemo(
    () => ({
      ...filter,
      is_starred: viewType === "starred",
    }),
    [filter, viewType],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Fleet
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SearchBar
          onFilterChange={handleFilterChange}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
      </Box>
      <LocationsTable
        filter={currentFilter}
        onFilterChange={handleFilterChange}
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
