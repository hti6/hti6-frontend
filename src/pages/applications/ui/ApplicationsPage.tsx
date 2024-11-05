// ApplicationsPage.tsx
import { TableWidget } from "@/widgets/table";
import { Category, DamageRequest, ApiResponse } from "../types";
import { TableConfig } from "@/widgets/table/types";

export const ApplicationsPage = () => {
  const tableConfig: TableConfig<DamageRequest, ApiResponse> = {
    endpoint: "http://nvision.su/api/v1/user/damage_requests",
    columns: [
      {
        key: "id",
        title: "ID ЗАЯВКИ",
        sortable: true,
      },
      {
        key: "priority",
        title: "СРОЧНОСТЬ",
        sortable: true,
        render: (value: string | number | Category[]) => (
            <span>
              {value == "critical"
                ? "Критический"
                : value === "high"
                  ? "Высокий"
                  : value === "middle"
                    ? "Средний"
                    : "Низкий"}
            </span>
          )
      },
      {
        key: "latitude",
        title: "МЕСТОПОЛОЖЕНИЕ",
        render: (_: string | number | Category[], row: DamageRequest) => (
          <span>
            {row.latitude}, {row.longitude}
          </span>
        ),
      },
      {
        key: "categories",
        title: "ТИП ПОВРЕЖДЕНИЯ",
        render: (categories: string | number | Category[]) => (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(categories) &&
              categories.length > 0 ? (
              categories.map((category) => (
                <span
                  key={category.id}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                >
                  {category.name}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Нет категорий</span>
            )}
          </div>
        ),
      },
      {
        key: "created_at",
        title: "ДАТА",
        sortable: true,
        render: (value: string | number | Category[]) => {
          const date = new Date(value as string);
          return date.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    ],
    filters: [
      { id: "users", label: "Сотрудники" },
      { id: "cameras", label: "Камеры" },
    ],
    defaultSort: {
      field: "created_at",
      order: "desc",
    },
    rowKey: "id",
    perPageOptions: [15, 30, 50, 100],
    dataTransform: (response: ApiResponse) => ({
      data: response.result,
      meta: response.meta,
    }),
  };

  return (
    <TableWidget<DamageRequest>
      config={tableConfig}
      onRowClick={(row) => console.log("Clicked row:", row)}
      renderEmptyState={() => (
        <div className="text-center py-8 text-gray-400">Заявок пока нет</div>
      )}
    />
  );
};
