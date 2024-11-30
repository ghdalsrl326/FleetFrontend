import { Box, Container, Typography, Alert, Snackbar } from "@mui/material";
import LocationsTable from "components/FleetDashboard/LocationsTable/index";
import SearchBar from "components/FleetDashboard/SearchBar";
import { useState } from "react";
import { LocationsFilter } from "types/location";

const FleetDashboard = () => {
  const [filter, setFilter] = useState<LocationsFilter>({
    page: 0,
    locationName: "",
    robotId: "",
    isStarred: false,
  });

  const [viewType, setViewType] = useState<"all" | "starred">("all");
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (newFilter: Partial<LocationsFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  const handleViewTypeChange = (newViewType: "all" | "starred") => {
    setViewType(newViewType);
    setFilter((prev) => ({
      ...prev,
      isStarred: newViewType === "starred",
    }));
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Fleet
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SearchBar
          onFilterChange={handleFilterChange}
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
        />
      </Box>
      <LocationsTable
        filter={filter}
        onFilterChange={handleFilterChange}
        onError={handleError}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FleetDashboard;
