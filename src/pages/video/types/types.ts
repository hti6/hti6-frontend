export interface Camera {
  id: string;
  name: string;
  url: string;
  latitude: number;
  longitude: number;
  created_at: string;
  photo_url: string;
}

export interface CamerasResponse {
  result: Camera[];
  message: string;
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  };
}
