import { http, HttpResponse } from "msw";
import { locations } from "mocks/db";

export const handlers = [
  http.get("/locations", ({ request }) => {
    const url = new URL(request.url);
    const locationName = url.searchParams.get("location_name") || "";
    const robotId = url.searchParams.get("robot_id") || "";
    const isStarred = url.searchParams.get("is_starred") === "true";
    const page = parseInt(url.searchParams.get("page") || "0");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "6");

    let filteredLocations = [...locations];

    if (
      (locationName && locationName.trim() !== "") ||
      (robotId && robotId.trim() !== "")
    ) {
      filteredLocations = filteredLocations.filter(
        (location) =>
          (locationName
            ? location.name.toLowerCase().includes(locationName.toLowerCase())
            : false) ||
          (robotId && location.robot
            ? location.robot.id.toLowerCase().includes(robotId.toLowerCase())
            : false),
      );
    }

    if (isStarred) {
      filteredLocations = filteredLocations.filter((location) => location.star);
    }

    const totalCount = filteredLocations.length;
    const paginatedLocations = filteredLocations.slice(
      page * pageSize,
      (page + 1) * pageSize,
    );

    return HttpResponse.json({
      totalCount,
      locations: paginatedLocations,
      page,
      pageSize,
    });
  }),

  http.get("/starred_location_ids", () => {
    const starredIds = locations
      .filter((location) => location.star)
      .map((location) => location.id);

    return HttpResponse.json({
      locationIds: starredIds,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    // Simulate random failures (30% chance)
    if (Math.random() < 0.3) {
      return HttpResponse.json(
        { error: "Simulated server error" },
        { status: 500 },
      );
    }

    try {
      const newStarredIds = (await request.json()) as number[];
      if (!Array.isArray(newStarredIds)) {
        return HttpResponse.json(
          { error: "Invalid request body" },
          { status: 400 },
        );
      }

      locations.forEach((location) => {
        location.star = newStarredIds.includes(location.id);
      });
      return HttpResponse.json({ locationIds: newStarredIds });
    } catch (error) {
      return HttpResponse.json(
        { error: "Encountered unexpected error" },
        { status: 500 },
      );
    }
  }),
];
