import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Location, LocationsFilter } from "types/location";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  fetchLocations,
  fetchStarredLocationIds,
  updateStarredLocationIds,
} from "services/locationService";

interface LocationsTableProps {
  filter: LocationsFilter;
  onFilterChange: (filter: Partial<LocationsFilter>) => void;
}

const LocationsTable = ({ filter, onFilterChange }: LocationsTableProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [starredIds, setStarredIds] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadLocations = async () => {
    try {
      const data = await fetchLocations(filter);
      setLocations(data.locations);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  const loadStarredIds = async () => {
    try {
      const data = await fetchStarredLocationIds();
      setStarredIds(data.locationIds);
    } catch (error) {
      console.error("Failed to fetch starred location ids:", error);
    }
  };

  useEffect(() => {
    loadStarredIds();
    loadLocations();
  }, [filter]);

  const handleStarClick = async (locationId: number) => {
    const newStarredIds = starredIds.includes(locationId)
      ? starredIds.filter((id) => id !== locationId)
      : [...starredIds, locationId];

    try {
      await updateStarredLocationIds(newStarredIds);
      setStarredIds(newStarredIds);
      if (filter.isStarred) {
        loadLocations();
      }
    } catch (error) {
      console.error("Failed to update starred locations:", error);
    }
  };

  const columns = [
    {
      field: "starred",
      headerName: "",
      width: 50,
      renderCell: (params: any) => (
        <IconButton onClick={() => handleStarClick(params.row.id)}>
          {starredIds.includes(params.row.id) ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    { field: "name", headerName: "Location Name", flex: 1 },
    {
      field: "robot",
      headerName: "Robot",
      flex: 1,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FiberManualRecordIcon
            sx={{
              fontSize: 12,
              color: params.value.isOnline ? "success.main" : "grey.500",
            }}
          />
          {params.value.id}
        </Box>
      ),
    },
  ];

  return (
    <DataGrid
      rows={locations}
      columns={columns}
      pagination
      paginationModel={{
        page: filter.page,
        pageSize: 6,
      }}
      onPaginationModelChange={(model) => onFilterChange(model)}
      rowCount={totalCount}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default LocationsTable;
