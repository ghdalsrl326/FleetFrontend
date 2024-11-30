export interface Robot {
  id: string;
  isOnline: boolean;
}

export interface Location {
  id: number;
  name: string;
  robot: Robot;
  star: boolean; // Added star property
}

export interface LocationsResult {
  totalCount: number;
  locations: Location[];
}

export interface LocationsFilter {
  page: number;
  locationName?: string;
  robotId?: string;
  isStarred?: boolean;
}
