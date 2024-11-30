import { useState, useCallback, useEffect } from "react";
import { Location, LocationsFilter } from "types/location";
import {
  fetchLocations,
  fetchStarredLocationIds,
  updateStarredLocationIds,
} from "services/locationService";

export const useLocations = (
  filter: LocationsFilter,
  onError: (message: string) => void,
) => {
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

  const handleStarClick = async (locationId: number) => {
    const newStarredIds = starredIds.includes(locationId)
      ? starredIds.filter((id) => id !== locationId)
      : [...starredIds, locationId];

    try {
      const response = await updateStarredLocationIds(newStarredIds);
      if (response.error) {
        throw new Error(response.error);
      }
      setStarredIds(newStarredIds);
      if (filter.isStarred) {
        loadLocations();
      }
    } catch (error) {
      onError("Could not star an item due to unexpected error");
      console.error("Failed to update starred locations:", error);
    }
  };

  const refresh = useCallback(() => {
    loadStarredIds();
    loadLocations();
  }, [loadStarredIds, loadLocations]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    locations,
    starredIds,
    totalCount,
    handleStarClick,
    refresh,
  };
};
