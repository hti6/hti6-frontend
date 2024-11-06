import { Camera, CamerasResponse } from "@/pages/video/types";
import { AddLarge } from "@atomaro/icons";
import { TableWidget } from "@/widgets/table";
import {TableConfig} from "@/widgets/table/types";
import {Card} from "@/shared/ui/card";
import {SolarMap} from "@/shared/icons";

export const VideoPage = () => {
  const tableConfig: TableConfig<Camera, CamerasResponse> = {
    endpoint: "http://nvision.su/api/v1/user/cameras",
    columns: [
      {
        key: "id",
        title: "ID КАМЕРЫ",
        sortable: true,
        className: "w-[300px]",
      },
      {
        key: "latitude",
        title: "МЕСТОПОЛОЖЕНИЕ",
        className: "flex-1",
        render: () => (<span>г. Якутск, Ленина 1</span>),
      },
    ],
    defaultSort: {
      field: "created_at",
      order: "desc",
    },
    rowKey: "id",
    perPageOptions: [15, 30, 50, 100],
    dataTransform: (response: CamerasResponse) => ({
      data: response.result,
      meta: response.meta,
    }),
    rowClassName:
      "hover:bg-[#F7F7F8] cursor-pointer transition-colors duration-200",
    renderHeaderButton: (
      <button className="bg-[#E22E65] hover:bg-[#E22E65]/75 text-white rounded-[16px] w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200">
        <AddLarge fill={"#fff"} className="w-5 h-5" />
      </button>
    ),
    dialog: {
      title: (row: Camera) => ({
        label: "Камера",
        highlight: `ID ${row.id}`
      }),
      content: (row: Camera) => ({
        photo_url: row.url,
        sections: [
          {
            content: (
                <div className="grid grid-cols-2 gap-4">
                  <Card icon={<SolarMap/>} title={"Местоположение"} content={row.latitude + ', ' + row.longitude} />
                </div>
            )
          }
        ]
      }),
      actions: (row: Camera) => [
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
    <TableWidget<Camera>
      config={tableConfig}
      onRowClick={(row) => {
        console.log("Navigate to camera details:", row);
      }}
      renderEmptyState={() => (
        <div className="text-center py-12">
          <p className="text-[#93979F] text-lg">Камер пока нет</p>
          <p className="text-[#93979F] mt-2">
            Нажмите + чтобы добавить новую камеру
          </p>
        </div>
      )}
      className="bg-white rounded-[24px] shadow-sm"
    />
  );
};
