import { LocationsFilter } from "types/location";

export const fetchLocations = async (filter: LocationsFilter) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", filter.page.toString());
  if (filter.locationName)
    searchParams.append("location_name", filter.locationName);
  if (filter.robotId) searchParams.append("robot_id", filter.robotId);
  if (filter.isStarred) searchParams.append("is_starred", "true");

  const response = await fetch(`/locations?${searchParams.toString()}`);
  return response.json();
};

export const fetchStarredLocationIds = async () => {
  const response = await fetch("/starred_location_ids");
  return response.json();
};

export const updateStarredLocationIds = async (newStarredIds: number[]) => {
  const response = await fetch("/starred_location_ids", {
    method: "PUT",
    body: JSON.stringify(newStarredIds),
  });
  return response.json();
};
