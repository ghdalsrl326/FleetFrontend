import { http, HttpResponse } from "msw";

import { Location } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ params }) => {
    // Please implement filtering feature here

    const result: LocationsResult = {
      total_count: 0,
      locations: [],
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", ({ request }) => {
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }

    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify(request.body),
    );

    return HttpResponse.json(null, { status: 204 });
  }),
];
