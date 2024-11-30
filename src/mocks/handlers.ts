import { http, HttpResponse } from "msw";
import { locations } from "mocks/db";

export const handlers = [
  http.get("/locations", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const locationName = url.searchParams.get("location_name") || "";
    const robotId = url.searchParams.get("robot_id") || "";
    const isStarred = url.searchParams.get("is_starred") === "true";
    const pageSize = 15;

    let filteredLocations = [...locations];

    // Apply filters
    if (locationName) {
      filteredLocations = filteredLocations.filter((location) =>
        location.name.toLowerCase().includes(locationName.toLowerCase()),
      );
    }

    if (robotId) {
      filteredLocations = filteredLocations.filter((location) =>
        location.robot.id.toLowerCase().includes(robotId.toLowerCase()),
      );
    }

    if (isStarred) {
      const starredIds = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]",
      );
      filteredLocations = filteredLocations.filter((location) =>
        starredIds.includes(location.id),
      );
    }

    const totalCount = filteredLocations.length;
    const paginatedLocations = filteredLocations.slice(
      page * pageSize,
      (page + 1) * pageSize,
    );

    return HttpResponse.json({
      total_count: totalCount,
      locations: paginatedLocations,
    });
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    try {
      const body = await request.json();
      sessionStorage.setItem("starred_location_ids", JSON.stringify(body));
      return HttpResponse.json(null, { status: 204 });
    } catch (error) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }
  }),
];
