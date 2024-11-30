import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Location, LocationsFilter } from "types/location";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface LocationsTableProps {
  filter: LocationsFilter;
  onFilterChange: (filter: Partial<LocationsFilter>) => void;
}

const LocationsTable = ({ filter, onFilterChange }: LocationsTableProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [starredIds, setStarredIds] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLocations = async () => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append("page", filter.page.toString());
      if (filter.location_name)
        searchParams.append("location_name", filter.location_name);
      if (filter.robot_id) searchParams.append("robot_id", filter.robot_id);
      if (filter.is_starred) searchParams.append("is_starred", "true");

      const response = await fetch(`/locations?${searchParams.toString()}`);
      const data = await response.json();
      setLocations(data.locations);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  // 최초 마운트 시에만 starred IDs를 가져옴
  useEffect(() => {
    const fetchStarredIds = async () => {
      try {
        const response = await fetch("/starred_location_ids");
        const data = await response.json();
        setStarredIds(data.location_ids);
      } catch (error) {
        console.error("Failed to fetch starred locations:", error);
      }
    };
    fetchStarredIds();
  }, []);

  // filter 변경 시에만 locations를 가져옴
  useEffect(() => {
    fetchLocations();
  }, [filter.page, filter.location_name, filter.robot_id, filter.is_starred]);

  const handleStarClick = async (locationId: number) => {
    const newStarredIds = starredIds.includes(locationId)
      ? starredIds.filter((id) => id !== locationId)
      : [...starredIds, locationId];

    try {
      await fetch("/starred_location_ids", {
        method: "PUT",
        body: JSON.stringify(newStarredIds),
      });
      setStarredIds(newStarredIds);
      // star 상태가 변경되고 starred view인 경우에만 locations 다시 가져옴
      if (filter.is_starred) {
        fetchLocations();
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
              color: params.value.is_online ? "success.main" : "grey.500",
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
        pageSize: 15,
      }}
      pageSizeOptions={[15]}
      onPaginationModelChange={(model) => onFilterChange(model)}
      rowCount={totalCount}
      checkboxSelection
      autoHeight
    />
  );
};

export default LocationsTable;
