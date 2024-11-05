export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface Filter {
  id: string;
  label: string;
}

export interface TableConfig<T, R = never> {
  columns: Column<T>[];
  filters?: Filter[];
  endpoint: string;
  defaultSort?: {
    field: string;
    order: "asc" | "desc";
  };
  rowKey: keyof T;
  perPageOptions?: number[];
  dataTransform?: (response: R) => {
    data: T[];
    meta: {
      current_page: number;
      total: number;
      per_page: number;
    };
  };
  rowClassName?: string;
  renderHeaderButton?: React.ReactNode;
}
