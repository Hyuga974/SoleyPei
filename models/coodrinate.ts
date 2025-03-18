export interface CoordData {
    coords:{
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        latitude: number;
        longitude: number;
        speed: number;
    },
    mocked: boolean;
    timestamp: number;
}

export interface Coord {
    latitude: number;
    longitude: number;
}

export interface LocalNames {
    oc: string;
    eu: string;
    fr: string;
  }
  
export interface LocationData {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
    state: string;
  }

export interface LocationInfo {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}