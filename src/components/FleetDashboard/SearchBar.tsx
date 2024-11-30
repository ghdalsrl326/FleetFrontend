import {
  Box,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocationsFilter } from "types/location";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useDebounce } from "hooks/useDebounce";

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
  const debouncedSearch = useDebounce(search, 500);
  const prevSearch = useRef(debouncedSearch);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (prevSearch.current !== debouncedSearch) {
      onFilterChange({
        locationName: debouncedSearch || undefined,
        robotId: debouncedSearch || undefined,
      });
      prevSearch.current = debouncedSearch;
    }
  }, [debouncedSearch, onFilterChange]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Select
        value={viewType}
        onChange={(e) => onViewTypeChange(e.target.value as "all" | "starred")}
        size="small"
        sx={{ width: "15%" }}
      >
        <MenuItem value="all">All Locations</MenuItem>
        <MenuItem value="starred">Starred</MenuItem>
      </Select>
      <TextField
        placeholder="Search by location name or robot ID"
        size="small"
        value={search}
        onChange={handleSearchChange}
        sx={{ width: "35%" }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
