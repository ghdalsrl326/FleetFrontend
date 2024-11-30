import { Box, MenuItem, Select, TextField } from "@mui/material";
import { LocationsFilter } from "../../types/location";
import { useDebounce } from "../../hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";

interface SearchBarProps {
  onFilterChange: (filter: Partial<LocationsFilter>) => void;
}

const SearchBar = ({ onFilterChange }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "starred">("all");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onFilterChange({
      location_name: debouncedSearch || undefined,
      is_starred: viewMode === "starred",
    });
  }, [debouncedSearch, viewMode, onFilterChange]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value as "all" | "starred")}
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
