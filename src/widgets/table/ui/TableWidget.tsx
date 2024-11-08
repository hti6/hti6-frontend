import { useState, useEffect, FC, useCallback } from "react";
import { AddSmall, RemoveSmall, Search } from "@atomaro/icons";
import { SolarSort } from "@/shared/icons";
import { Filter, TableConfig } from "../types";
import { cn } from "@/shared/lib/utils";
import { useUser } from "@/app/providers";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";

interface TableWidgetProps<T> {
  config: TableConfig<T>;
  className?: string;
  onRowClick?: (row: T) => void;
  renderCustomHeader?: () => React.ReactNode;
  renderCustomFooter?: () => React.ReactNode;
  renderEmptyState?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: string) => React.ReactNode;
}

interface QueryParams {
  first?: number;
  page?: number;
  sort?: string;
  sort_order?: "asc" | "desc";
  search?: string;
  filter?: string;
}

//const fetchTableData = async <T, R = never>(
//  endpoint: string,
//  params: QueryParams,
//  token?: string,
//  transform?: (response: R) => {
//    result: T[];
//    meta: {
//      current_page: number;
//      total: number;
//      per_page: number;
//    };
//  },
//): Promise<{
//  result: T[];
//  meta: {
//    current_page: number;
//    total: number;
//    per_page: number;
//  };
//}> => {
//  const queryParams = new URLSearchParams();
//  Object.entries(params).forEach(([key, value]) => {
//    if (value !== undefined) {
//      queryParams.append(key, value.toString());
//    }
//  });
//
//  const response = await fetch(`${endpoint}?${queryParams}`, {
//    headers: {
//      Authorization: `Bearer ${token}`,
//      "Content-Type": "application/json",
//    },
//  });
//
//  console.log(endpoint, queryParams, token, response.status);
//
//  if (response.status !== 200) {
//    throw new Error("Пусто");
//  }
//
//  const responseData = await response.json();
//
//  if (transform) {
//    return transform(responseData);
//  }
//
//  return responseData;
//};

interface TableHeaderProps {
  onSearch: (value: string) => void;
  onFilter: (filterId?: string) => void;
  activeFilter?: string;
  filters?: Filter[];
  renderHeaderButton?: React.ReactNode;
}

const TableHeader: FC<TableHeaderProps> = ({
  onSearch,
  onFilter,
  activeFilter,
  filters,
  renderHeaderButton,
}) => {
  return (
    <div className="font-base mb-2 flex gap-2 items-center rounded-[24px] justify-between bg-[#FFFFFF] p-[16px]">
      <div
        className={
          "flex items-center gap-2 w-full rounded-[16px] py-[16px] px-[12px] bg-[#FAFAFB] border-[1.5px] border-[#595F6B0A]"
        }
      >
        <div className={"flex items-center"}>
          <Search fill={"#ACAFB5"} />
        </div>
        <input
          className={"bg-[#FAFAFB] focus:outline-none"}
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Поиск"
        />
      </div>
      {filters && (
        <div className="flex font-body bg-[#F7F7F8] p-[7px] rounded-[16px]">
          <button
            className={`rounded-[11px] px-[16px] py-[10px] ${!activeFilter ? "bg-[#fff] text-[#000]" : "text-[#93979F]"}`}
            onClick={() => onFilter(undefined)}
          >
            Все
          </button>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`rounded-[11px] px-[16px] py-[10px] ${activeFilter === filter.id ? "bg-[#fff] text-[#000]" : "text-[#93979F]"}`}
              onClick={() => onFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
      {renderHeaderButton && <div className="ml-4">{renderHeaderButton}</div>}
    </div>
  );
};
export function TableWidget<T>({
  config,
  className,
  onRowClick,
  renderCustomHeader,
  renderCustomFooter,
  renderEmptyState,
  renderLoading = () => <div className="text-center py-8">Загрузка...</div>,
  renderError = (error) => (
    <div className="text-red-500 text-center py-8">{error}</div>
  ),
}: TableWidgetProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUser();

  const [queryParams, setQueryParams] = useState<QueryParams>({
    first: config.perPageOptions?.[0] ?? 15,
    page: 1,
    sort: config.defaultSort?.field,
    sort_order: config.defaultSort?.order ?? "desc",
  });

  const renderDialogContent = (row: T) => {
    const dialogContent = config.dialog?.content(row);

    return (
        <>
          {dialogContent?.photo_url && (
              <div className="flex justify-center">
                <img
                    src={dialogContent.photo_url}
                    alt=""
                    className="object-cover rounded-[16px] max-h-[300px]"
                />
              </div>
          )}
          {dialogContent?.sections.map((section, index) => (
              <div key={index} className="flex-1">
                {section.title && (
                    <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                )}
                {section.content}
              </div>
          ))}
        </>
    );
  };

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const loadData = useCallback(async () => {
    try {
      if (!token) {
        throw new Error("No Token");
      }
      setLoading(true);
      //const response = await fetchTableData<T>(
      //  config.endpoint,
      //  queryParams,
      //  token,
      //);
      //
      const qp = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          qp.append(key, value.toString());
        }
      });

      const response = await fetch(`${config.endpoint}?${qp}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      //if (response.status !== 200) {
      //  throw new Error("Пусто");
      //}

      const responseData = await response.json();
      console.log(responseData);

      //if (transform) {
      //  return transform(responseData);
      //}

      setData(responseData.result);
      setTotal(responseData.meta.total);
      setCurrentPage(responseData.meta.current_page);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "Пусто");
    } finally {
      setLoading(false);
    }
  }, [queryParams, config.endpoint, token]);

  useEffect(() => {
    if (token) loadData();
  }, [loadData, token]);

  const handleSort = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      sort: field,
      sort_order:
        prev.sort === field && prev.sort_order === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (search: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1,
    }));
  };

  const handleFilter = (filter?: string) => {
    setQueryParams((prev) => ({
      ...prev,
      filter,
      page: 1,
    }));
  };

  const handleRefetch = useCallback(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={`flex flex-col h-full ${className || ""}`}>
      {renderCustomHeader?.() ?? (
        <TableHeader
          onSearch={handleSearch}
          onFilter={handleFilter}
          activeFilter={queryParams.filter}
          filters={config.filters}
          renderHeaderButton={config.renderHeaderButton?.(handleRefetch)}
        />
      )}

      <div className="bg-[#fff] h-full flex flex-col justify-between rounded-[24px] p-[16px]">
        {loading ? (
          renderLoading()
        ) : error ? (
          renderError(error)
        ) : data.length === 0 && renderEmptyState ? (
          renderEmptyState()
        ) : (
          <div className="w-full">
            <div
              className={"grid gap-4 bg-[#F7F7F8] rounded-[12px]"}
              style={{
                gridTemplateColumns: `repeat(${config.columns.length}, minmax(0, 1fr))`,
              }}
            >
              {config.columns.map((column) => (
                <div
                  key={String(column.key)}
                  className="px-6 py-4 text-[16px] text-[#1018288C] font-heading cursor-pointer"
                  onClick={() =>
                    column.sortable && handleSort(String(column.key))
                  }
                >
                  <div className="[&>svg]:fill-current flex items-center gap-1">
                    {column.title}
                    <div
                      className={cn(
                        "[&>svg]:fill-current",
                        queryParams.sort == column.key
                          ? "text-static-black"
                          : "text-[#1018288C]",
                      )}
                    >
                      {column.sortable && (
                        <SolarSort

                        //color={
                        //  queryParams.sort === column.key ? "#000" : "#ACAFB5"
                        //}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {data.map((row) => (
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                        key={String(row[config.rowKey])}
                        className={`grid gap-4 font-body text-[14px] hover:bg-[#F7F7F8] ${onRowClick ? "cursor-pointer" : ""}`}
                        style={{
                          gridTemplateColumns: `repeat(${config.columns.length}, minmax(0, 1fr))`,
                        }}
                        onClick={() => onRowClick?.(row)}
                    >
                      {config.columns.map((column) => (
                          <div key={String(column.key)} className="px-6 py-4">
                            {column.render
                                ? column.render(row[column.key], row)
                                : String(row[column.key])}
                          </div>
                      ))}
                    </div>
                  </DialogTrigger>
                  {config.dialog && (
                      <DialogContent full>
                        <DialogHeader full>
                          <DialogTitle full>
                            {config.dialog.title(row).label}{' '}
                            <span className="text-[#E22E65]">
                              {config.dialog.title(row).highlight}
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                          {renderDialogContent(row)}
                        <DialogFooter full>
                          {config.dialog.actions?.(row, loadData).map((action, index) => (
                              <Button variant={action.variant} key={index} onClick={action.onClick}>
                                {action.label}
                              </Button>
                          ))}
                        </DialogFooter>
                      </DialogContent>
                  )}
                </Dialog>
            ))}
          </div>
        )}

        {renderCustomFooter?.() ?? (
            <div className="flex items-center justify-between font-body px-6 py-4">
            <div className="flex gap-3 items-center bg-[#fff]">
              <div
                className={
                  "flex items-center text-base border-[1.5px] border-[#595F6B0A] rounded-[16px]"
                }
              >
                <button
                  className={"p-3"}
                  onClick={() =>
                    setQueryParams((prev) => ({
                      ...prev,
                      page: prev.page! - 1,
                    }))
                  }
                  disabled={currentPage <= 1}
                >
                  <RemoveSmall fill={"#93979F"} className={"w-6 h-6"} />
                </button>
                <span>{currentPage}</span>
                <button
                  className={"p-3"}
                  onClick={() =>
                    setQueryParams((prev) => ({
                      ...prev,
                      page: prev.page! + 1,
                    }))
                  }
                  disabled={
                    currentPage >= Math.ceil(total / queryParams.first!)
                  }
                >
                  <AddSmall fill={"#93979F"} className={"w-6 h-6"} />
                </button>
              </div>
              <span className="text-[#93979F]">
                из {Math.ceil(total / queryParams.first!)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#93979F]">
              <span>Показать:</span>
              <select
                className="rounded-[16px] border-[1.5px] border-[#595F6B0A] p-4 text-[#000]"
                value={queryParams.first}
                onChange={(e) =>
                  setQueryParams((prev) => ({
                    ...prev,
                    first: Number(e.target.value),
                    page: 1,
                  }))
                }
              >
                {(config.perPageOptions ?? [15, 30, 50, 100]).map((option) => (
                  <option key={option} value={option}>
                    {option} строк
                  </option>
                ))}
              </select>
              <span>
                {(currentPage - 1) * queryParams.first! + 1}-
                {Math.min(currentPage * queryParams.first!, total)} из {total}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
