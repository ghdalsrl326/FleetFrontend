import { DataGrid } from "@mui/x-data-grid";
import { LocationsFilter } from "types/location";
import { useState } from "react";
import { createColumns } from "components/FleetDashboard/LocationsTable/columns";
import { useLocations } from "hooks/useLocations";

interface LocationsTableProps {
  filter: LocationsFilter;
  onFilterChange: (filter: Partial<LocationsFilter>) => void;
  onError: (message: string) => void;
}

const LocationsTable = ({
  filter,
  onFilterChange,
  onError,
}: LocationsTableProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 6,
  });

  const { locations, starredIds, totalCount, handleStarClick, refresh } =
    useLocations(filter, onError);

  const handlePaginationModelChange = (newModel: any) => {
    setPaginationModel(newModel);
    onFilterChange({ page: newModel.page });
  };

  const handleAddRobot = (locationId: number) => {
    console.log(`Add robot to location ${locationId}`);
  };

  const columns = createColumns({
    onStarClick: handleStarClick,
    onRefresh: refresh,
    onAddRobot: handleAddRobot,
    starredIds,
  });

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
