export interface Robot {
  id: string;
  is_online: boolean;
}

export interface Location {
  id: number;
  name: string;
  robot: Robot;
}

export interface LocationsResult {
  total_count: number;
  locations: Location[];
}

export interface LocationsFilter {
  page: number;
  location_name?: string;
  robot_id?: string;
  is_starred?: boolean;
}
