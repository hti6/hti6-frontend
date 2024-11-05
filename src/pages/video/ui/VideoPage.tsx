import { Camera, CamerasResponse } from "@/pages/video/types";
import { AddLarge } from "@atomaro/icons";
import { TableWidget } from "@/widgets/table";
import {TableConfig} from "@/widgets/table/types";

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
    // Кастомизация внешнего вида строк таблицы
    rowClassName:
      "hover:bg-[#F7F7F8] cursor-pointer transition-colors duration-200",
    // Добавляем кнопку создания новой камеры
    renderHeaderButton: (
      <button className="bg-[#E22E65] hover:bg-[#E22E65]/75 text-white rounded-[16px] w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200">
        <AddLarge fill={"#fff"} className="w-5 h-5" />
      </button>
    ),
  };

  return (
    <TableWidget<Camera>
      config={tableConfig}
      onRowClick={(row) => {
        console.log("Navigate to camera details:", row);
        // Здесь можно добавить навигацию к деталям камеры
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
