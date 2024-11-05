export interface Category {
  id: string;
  name: string;
}

export interface DamageRequest {
  id: string;
  priority: string;
  latitude: number;
  longitude: number;
  created_at: string;
  categories: Category[];
  type: "users" | "cameras";
}

export interface ApiResponse {
  result: DamageRequest[];
  message: string;
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  };
}
