import { LocationsFilter } from "types/location";

export const fetchLocations = async (filter: LocationsFilter) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", filter.page.toString());
  if (filter.locationName)
    searchParams.append("locationName", filter.locationName);
  if (filter.robotId) searchParams.append("robotId", filter.robotId);
  if (filter.isStarred) searchParams.append("isStarred", "true");

  const response = await fetch(`/locations?${searchParams.toString()}`);
  return response.json();
};

export const fetchStarredLocationIds = async () => {
  const response = await fetch("/starredLocationIds");
  return response.json();
};

export const updateStarredLocationIds = async (newStarredIds: number[]) => {
  const response = await fetch("/starredLocationIds", {
    method: "PUT",
    body: JSON.stringify(newStarredIds),
  });
  return response.json();
};
