import {ReactNode} from "react";
import {ButtonVariant} from "@/shared/ui/button/button.tsx";

export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  className?: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
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
  renderHeaderButton?: (onRefetch: () => void) => React.ReactNode;
  dialog?: DialogConfig<T>;
}

export interface DialogConfig<T> {
  title: (row: T) => {
    label: string;
    highlight: string;
  };
  content: (row: T) => {
    photo_url?: string;
    sections: {
      title?: string;
      content: ReactNode;
    }[];
  };
  actions?: (row: T, onRefetch: () => void) => {
    variant: ButtonVariant;
    label: string;
    onClick: () => void;
  }[];
}