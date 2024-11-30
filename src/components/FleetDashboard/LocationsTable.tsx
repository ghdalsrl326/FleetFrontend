import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Location, LocationsFilter } from "types/location";
import { useEffect, useState, useCallback } from "react";
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

  const loadLocations = useCallback(async () => {
    try {
      const data = await fetchLocations(filter);
      setLocations(data.locations);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  }, [filter]);

  const loadStarredIds = useCallback(async () => {
    try {
      const data = await fetchStarredLocationIds();
      setStarredIds(data.locationIds);
    } catch (error) {
      console.error("Failed to fetch starred location ids:", error);
    }
  }, []);

  useEffect(() => {
    loadStarredIds();
    loadLocations();
  }, [loadStarredIds, loadLocations]);

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

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 6,
  });

  useEffect(() => {
    loadLocations();
  }, [loadLocations, paginationModel]);

  const handlePaginationModelChange = (newModel: any) => {
    setPaginationModel(newModel);
    onFilterChange({ page: newModel.page });
  };

  const StarColumnHeader = () => (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <IconButton
        size="small"
        onClick={() => {
          loadStarredIds();
          loadLocations();
        }}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const columns = [
    {
      field: "starred",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => <StarColumnHeader />,
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
    { field: "name", headerName: "Locations", flex: 1 },
    {
      field: "robot",
      headerName: "Robots",
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
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      pageSizeOptions={[6]}
      rowCount={totalCount}
      paginationMode="server"
      checkboxSelection
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          typography: "subtitle2",
        },
      }}
    />
  );
};

export default LocationsTable;
