import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Location, LocationsFilter } from "../../types/location";
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

  useEffect(() => {
    fetch(`/locations?${new URLSearchParams(filter as any)}`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations);
        setTotalCount(data.total_count);
      });

    fetch("/starred_location_ids")
      .then((res) => res.json())
      .then((data) => setStarredIds(data.location_ids));
  }, [filter]);

  const handleStarClick = async (id: number) => {
    try {
      const newStarredIds = starredIds.includes(id)
        ? starredIds.filter((starredId) => starredId !== id)
        : [...starredIds, id];

      await fetch("/starred_location_ids", {
        method: "PUT",
        body: JSON.stringify(newStarredIds),
      });

      setStarredIds(newStarredIds);
    } catch (error) {
      alert("Could not star an item due to unexpected error");
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
              color: params.value ? "success.main" : "grey.500",
            }}
          />
          {params.value ? params.value.id : "Add"}
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
