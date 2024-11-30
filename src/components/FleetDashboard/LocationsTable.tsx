import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Location, LocationsFilter } from "types/location";
import { useEffect, useState, useCallback } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  const theme = useTheme();

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

  const handleAddRobot = (locationId: number) => {
    console.log(`Add robot to location ${locationId}`);
  };

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
            <StarIcon sx={{ color: theme.palette.notice.main }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Locations",
      flex: 1,
      renderCell: (params: any) => (
        <Button
          sx={{
            backgroundColor: params.row.robot?.isOnline
              ? theme.palette.secondary.main
              : theme.palette.grey[300],
            width: "100%",
            justifyContent: "space-between",
          }}
          color="secondary"
          variant="contained"
          endIcon={<ChevronRightIcon />}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "robot",
      headerName: "Robots",
      flex: 1,
      renderCell: (params: any) => {
        if (!params.value) {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                height: "100%",
              }}
            >
              <FiberManualRecordIcon
                sx={{
                  color: theme.palette.grey[500],
                  fontSize: theme.typography.subtitle1.fontSize,
                }}
              />
              <Typography
                component="span"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  font: theme.typography.subtitle2,
                  textDecoration: "underline",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleAddRobot(params.row.id)}
              >
                Add
              </Typography>
            </Box>
          );
        }

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: "100%",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: theme.typography.body1,
                color: params.value.isOnline
                  ? theme.palette.success.main
                  : theme.palette.grey[500],
              }}
            />
            <Typography
              sx={{
                ...theme.typography.subtitle2,
                color: params.value.isOnline
                  ? theme.palette.grey[900]
                  : theme.palette.grey[500],
              }}
            >
              {params.value.id}
            </Typography>
          </Box>
        );
      },
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
