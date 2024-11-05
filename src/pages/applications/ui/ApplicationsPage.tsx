// ApplicationsPage.tsx
import { TableWidget } from "@/widgets/table";
import { Category, DamageRequest, ApiResponse } from "../types";
import { TableConfig } from "@/widgets/table/types";

export const ApplicationsPage = () => {
  const tableConfig: TableConfig<DamageRequest> = {
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
        render: (value: string) => {
          return (
            <span>
              {value == "critical"
                ? "Критический"
                : value === "high"
                  ? "Высокий"
                  : value === "middle"
                    ? "Средний"
                    : "Низкий"}
            </span>
          );
        },
      },
      {
        key: "location",
        title: "МЕСТОПОЛОЖЕНИЕ",
        render: (_: any, row: DamageRequest) => (
          <span>
            {row.latitude}, {row.longitude}
          </span>
        ),
      },
      {
        key: "categories",
        title: "ТИП ПОВРЕЖДЕНИЯ",
        render: (categories: Category[]) => (
          <div className="flex flex-wrap gap-1">
            {categories.length > 0 ? (
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
        render: (value: string) => {
          const date = new Date(value);
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
