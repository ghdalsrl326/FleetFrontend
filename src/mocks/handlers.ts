import { http, HttpResponse } from "msw";
import { locations } from "mocks/db";

export const handlers = [
  http.get("/locations", ({ request }) => {
    const url = new URL(request.url);
    const locationName = url.searchParams.get("locationName") || "";
    const robotId = url.searchParams.get("robotId") || "";
    const isStarred = url.searchParams.get("isStarred") === "true";
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
          (robotId
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

  http.get("/starredLocationIds", () => {
    const starredIds = locations
      .filter((location) => location.star)
      .map((location) => location.id);

    return HttpResponse.json({
      locationIds: starredIds,
    });
  }),

  http.put("/starredLocationIds", async ({ request }) => {
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
