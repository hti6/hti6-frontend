import { useMap } from "@/app/providers";
import {
  SolarCalendar,
  SolarMap,
  SolarPriority,
  SolarTarget,
  SolarUserRoundedIcon,
} from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Map } from "@/shared/ui/map";
import { load } from "@2gis/mapgl";
import { Map as MapInstance } from "@2gis/mapgl/types";
import { FC, useCallback, useEffect, useState } from "react";
import { InputMarker } from "@2gis/mapgl-clusterer";

function getLabelByPriority(priority: string): string {
  switch (priority) {
    case "low":
      return "низкая";
    case "mid":
      return "средняя";
    case "high":
      return "высокая";
    case "critical":
      return "критичная";
    default:
      return "";
  }
}

const ColorByPriority: (priority: string, isIcon: boolean) => string = (
  priority: string,
  isIcon: boolean,
) => {
  if (isIcon)
    switch (priority) {
      case "low":
        return "text-neutral-soft bg-neutral-container";
      case "mid":
        return "text-warning bg-warning-container";
      case "high":
        return "text-status-06 bg-status-06-container";
      case "critical":
        return "text-error bg-error-container";
      default:
        return "";
    }
  else
    switch (priority) {
      case "low":
        return "text-neutral-on-container bg-neutral-container";
      case "mid":
        return "text-warning-on-container bg-warning-container";
      case "high":
        return "text-status-06-on-container bg-status-06-container";
      case "critical":
        return "text-error-on-container bg-error-container";
      default:
        return "";
    }
};

function formatUTCString(utcString: string): string {
  const date = new Date(utcString);
  const pad = (n: number) => (n < 10 ? "0" + n : n); // Helper function to pad single digits
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1); // Months are zero-indexed
  const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

interface Damage {
  id: string;
  created_at: string;
  priority: string;
  user: {
    id: string;
    name: string;
    login: string;
    created_at: string;
    is_admin: boolean;
  };
  categories: { id: string; name: string }[];
  type: string;
  latitude: number;
  longitude: number;
  photo_url: string;
}

interface Result {
  damages: Damage[];
  cameras: {
    id: string;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
    created_at: string;
  }[];
}

interface Marker extends Damage {
  open: boolean;
}

interface MapWidgetProps {
  data: Result | undefined;
}

export const MapWidget: FC<MapWidgetProps> = ({ data }) => {
  const { mapInstance, cluster, count, setCount } = useMap();
  const [markers, setMarkers] = useState<Marker[]>([]);

  const toggleMarker = (array: Marker[], id: string) => {
    console.log(array, "toggleMarker");
    const newMarkers: Marker[] = [];
    array.forEach((marker) => {
      if (marker.id == id) {
        const updatedMarker: Marker = {
          ...marker,
          open: !marker.open,
        };
        newMarkers.push(updatedMarker);
      } else {
        newMarkers.push(marker);
      }
    });

    setMarkers(newMarkers);
  };

  const setMap = useCallback(
    async (mapInstance: MapInstance | undefined) => {
      if (
        mapInstance == undefined ||
        data?.damages == undefined ||
        cluster == undefined
      )
        return;

      const realMarkers = data.damages.map((app) => {
        return {
          ...app,
          open: false,
        };
      });

      setMarkers(realMarkers);

      const mapglAPI = await load();

      const map = mapInstance;

      const allMarkers: InputMarker[] = [];

      setCount((prev) => prev + data.damages.length);

      console.log(count);

      for (let i = 0; i < data.damages.length; i++) {
        const cords = [
          Number(data.damages[i]["longitude"]),
          Number(data.damages[i]["latitude"]),
        ];

        allMarkers.push({
          coordinates: cords,
          icon: `/priority/${data.damages[i]["priority"]}.svg`,
          zIndex:
            data.damages[i]["priority"] == "low"
              ? 1
              : data.damages[i]["priority"] == "mid"
                ? 2
                : data.damages[i]["priority"] == "high"
                  ? 3
                  : 4,
          userData: {
            index: i + count,
            id: data.damages[i]["id"],
            priority: data.damages[i]["priority"],
          },
        });

        //const marker = new mapglAPI.Marker(mapInstance, {
        //  coordinates: cords,
        //  icon: `/priority/${bodyApplications[i]["priority"]}.svg`,
        //});

        const popup = new mapglAPI.HtmlMarker(map, {
          coordinates: cords,
          html: `
<div class="p-4 absolute rounded-l bg-bg-surface1 translate-x-[-10%] translate-y-[-130%] gap-4 flex flex-col">
  <div class="w-full flex items-center justify-between">
    <div class="flex gap-1">
      <div class="p-1 rounded-xs ${ColorByPriority(data.damages[i]["priority"], true)}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.77977 6.60962L5.82119 3.84759C7.14077 2.06222 7.80055 1.16954 8.41613 1.35818C9.0317 1.54683 9.0317 2.6417 9.0317 4.83145V5.03792C9.0317 5.82772 9.0317 6.22261 9.28406 6.47032L9.29741 6.48315C9.55522 6.72562 9.96622 6.72562 10.7882 6.72562C12.2675 6.72562 13.0071 6.72562 13.2571 7.17425C13.2612 7.18167 13.2652 7.18916 13.2692 7.19671C13.5051 7.65228 13.0769 8.23169 12.2204 9.3905L10.1789 12.1525C8.85935 13.9379 8.19955 14.8305 7.58397 14.6419C6.9684 14.4532 6.96842 13.3584 6.96845 11.1686L6.96845 10.9622C6.96846 10.1724 6.96847 9.7775 6.71611 9.52979L6.70276 9.51696C6.44495 9.27449 6.03394 9.27449 5.21192 9.27449C3.73267 9.27449 2.99305 9.27449 2.74308 8.82586C2.73894 8.81843 2.73492 8.81095 2.73101 8.8034C2.49504 8.34783 2.92328 7.76843 3.77977 6.60962Z" />
        </svg>
      </div>
      <div class="description-l rounded-xs py-1 px-2 ${ColorByPriority(data.damages[i]["priority"], false)}">${getLabelByPriority(data.damages[i]["priority"])}</div>
    </div>
    <span class="whitespace-nowrap body-s text-fg-soft">
      ${formatUTCString(data.damages[i]["created_at"])}
    </span>
  </div>
  <div class="flex flex-col">
    <h2 class="mb-2.5 heading-2">${data.damages[i]["id"]}</h2>
    <span class="body-s">${data.damages[i]["longitude"]}° ${data.damages[i]["latitude"]}°</span>
  </div>
</div>
`,
        });

        const popupHtml = popup.getContent();
        popupHtml.style.display = "none";

        console.log(allMarkers);

        cluster.on("click", (event) => {
          if (event.target.type == "marker") {
            if (
              (event.target.data as InputMarker).userData["index"] ==
              i + count
            )
              toggleMarker(
                realMarkers,
                (event.target.data as InputMarker).userData["id"],
              );
          } else if (event.target.type == "cluster") {
            map.setCenter(event.lngLat);
            map.setZoom(cluster.getClusterExpansionZoom(event.target.id));
          }
        });

        cluster.on("mouseover", (event) => {
          if (event.target.type == "marker") {
            if (
              (event.target.data as InputMarker).userData["index"] ==
              i + count
            ) {
              event.target.data.zIndex = 10;
              popupHtml.style.display = "block";
            }
          }
        });

        cluster.on("mouseout", (event) => {
          if (event.target.type == "marker")
            if (
              (event.target.data as InputMarker).userData["index"] ==
              i + count
            ) {
              event.target.data.zIndex = 0;
              popupHtml.style.display = "none";
            }
        });
      }

      cluster.load(allMarkers);
    },
    [data, cluster],
  );

  useEffect(() => {
    if (data != undefined) setMap(mapInstance);
  }, [mapInstance, data, setMap]);

  return (
    <div className="py-2 pr-2 flex-1">
      <Map />
      {markers.map((row, i) => (
        <Dialog
          key={i}
          open={row.open}
          onOpenChange={() => {
            toggleMarker(markers, row.id);
          }}
        >
          <DialogContent full>
            <DialogHeader full>
              <DialogTitle full>
                ЗАЯВКА <span className="text-accent">{row.id}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img
                src={row.photo_url}
                alt=""
                className="object-cover rounded-[16px] max-h-[300px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card
                icon={<SolarUserRoundedIcon />}
                title={"Сотрудник"}
                content={row.user.name}
              />
              <Card
                icon={<SolarCalendar />}
                title={"Дата заявки"}
                content={new Date(row.created_at).toLocaleDateString("ru-RU")}
              />
              <Card
                icon={<SolarPriority />}
                title={"Срочность"}
                content={
                  row.priority == "critical"
                    ? "Критический"
                    : row.priority === "high"
                      ? "Высокий"
                      : row.priority === "mid"
                        ? "Средний"
                        : "Низкий"
                }
              />
              <Card
                icon={<SolarMap />}
                title={"Местоположение"}
                content={row.latitude + ", " + row.longitude}
              />
              <Card
                width={"full"}
                icon={<SolarTarget />}
                title={"Тип повреждения"}
                content={
                  Array.isArray(row.categories) && row.categories.length > 0
                    ? row.categories.map((category) => (
                      <span
                        key={category.id}
                        className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                      >
                        {category.name}
                      </span>
                    ))
                    : "Нет категорий"
                }
              />
            </div>
            <DialogFooter full>
              <Button variant="secondary">Посмотреть на карте</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
