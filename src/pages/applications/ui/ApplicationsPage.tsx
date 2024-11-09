// ApplicationsPage.tsx
import { TableWidget } from "@/widgets/table";
import {Category, DamageRequest, ApiResponse, User} from "../types";
import { TableConfig } from "@/widgets/table/types";
import {Card} from "@/shared/ui/card";
import {SolarCalendar, SolarPriority, SolarTarget, SolarUserRoundedIcon, SolarMap} from "@/shared/icons";

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
        render: (value: string | number | User | Category[]) => (
          <span>
            {value == "critical"
              ? "Критический"
              : value === "high"
                ? "Высокий"
                : value === "middle"
                  ? "Средний"
                  : "Низкий"}
          </span>
        ),
      },
      {
        key: "latitude",
        title: "МЕСТОПОЛОЖЕНИЕ",
        render: (_: string | number | User | Category[], row: DamageRequest) => (
          <span>
            {row.latitude}, {row.longitude}
          </span>
        ),
      },
      {
        key: "categories",
        title: "ТИП ПОВРЕЖДЕНИЯ",
        render: (categories: string | number | User | Category[]) => (
          <div className="flex flex-wrap gap-1">
            {Array.isArray(categories) && categories.length > 0 ? (
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
        render: (value: string | number | User | Category[]) => {
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
    dialog: {
      title: (row: DamageRequest) => ({
        label: "Заявка",
        highlight: `ID ${row.id}`
      }),
      content: (row: DamageRequest) => ({
        photo_url: row.photo_url,
        sections: [
          {
            content: (
                <div className="grid grid-cols-2 gap-4">
                  <Card icon={<SolarUserRoundedIcon/>} title={"Сотрудник"} content={row.user?.name} />
                  <Card icon={<SolarCalendar/>} title={"Дата заявки"} content={new Date(row.created_at).toLocaleDateString('ru-RU')} />
                  <Card icon={<SolarPriority/>} title={"Срочность"} content={row.priority == "critical"
                      ? "Критический"
                      : row.priority === "high"
                          ? "Высокий"
                          : row.priority === "middle"
                              ? "Средний"
                              : "Низкий"}
                  />
                  <Card icon={<SolarMap/>} title={"Местоположение"} content={row.latitude + ', ' + row.longitude} />
                  <Card width={'full'} icon={<SolarTarget/>} title={"Тип повреждения"} content={
                    Array.isArray(row.categories) && row.categories.length > 0 ? (
                        row.categories.map((category) => (
                            <span
                                key={category.id}
                                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                            >
                              {category.name}
                              </span>
                        ))) : (
                        'Нет категорий'
                    )
                  } />
                </div>
            )
          }
        ]
      }),
      actions: (row: DamageRequest) => [
        {
          variant: 'primary',
          label: "Обсудить с ИИ",
          onClick: () => {
            console.log("Открыть чат с ИИ для камеры:", row.id);
          }
        },
        {
          variant: 'secondary',
          label: "Посмотреть на карте",
          onClick: () => {
            console.log("Открыть карту с камерой:", row.id);
          }
        }
      ]
    }
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
