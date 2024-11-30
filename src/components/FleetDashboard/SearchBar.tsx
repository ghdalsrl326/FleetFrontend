import { Box, MenuItem, Select, TextField } from "@mui/material";
import { LocationsFilter } from "types/location";
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  onFilterChange: (filter: Partial<LocationsFilter>) => void;
  viewType: "all" | "starred";
  onViewTypeChange: (viewType: "all" | "starred") => void;
}

const SearchBar = ({
  onFilterChange,
  viewType,
  onViewTypeChange,
}: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({
      locationName: value || undefined,
      robotId: value || undefined,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Select
        value={viewType}
        onChange={(e) => onViewTypeChange(e.target.value as "all" | "starred")}
        size="small"
        sx={{ width: 200 }}
      >
        <MenuItem value="all">All Locations</MenuItem>
        <MenuItem value="starred">Starred</MenuItem>
      </Select>
      <TextField
        placeholder="Search by location name or robot ID"
        size="small"
        value={search}
        onChange={handleSearchChange}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default SearchBar;
