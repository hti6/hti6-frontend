import { useCallback, useEffect, useRef } from "react";
import { load } from "@2gis/mapgl";
import { useMap } from "@/app/providers";
import { SECRET_KEY_2GIS } from "@/shared/env";
import { MapWrapper } from "./wrapper";
import { Clusterer } from "@2gis/mapgl-clusterer";

export const Map = () => {
  const { setMapInstance, mapInstance, zoom, setCluster } = useMap();
  const didMapSet = useRef(false);

  const start = useCallback(async () => {
    console.log(mapInstance);

    if (didMapSet.current === true) return;

    didMapSet.current = true;

    const mapglAPI = await load();

    console.log(SECRET_KEY_2GIS);

    const map = new mapglAPI.Map("map-container", {
      center: [129.737, 62.03],
      zoom: zoom,
      key: SECRET_KEY_2GIS,
    });

    const cluster = new Clusterer(map, {
      radius: 20,
      clusterStyle: (pointsCount) => {
        return {
          type: "html",
          html: `<div class="w-12 h-12 text-center text-fg heading-2 bg-bg-surface1 rounded-full flex justify-center items-center">${pointsCount}</div>`,
        };
      },
    });

    console.log(cluster);

    setCluster(cluster);

    setMapInstance(map);
  }, [setMapInstance, mapInstance, didMapSet, zoom, setCluster]);

  useEffect(() => {
    start();
  }, [start, setMapInstance]);

  return (
    <div className="w-full h-full">
      <MapWrapper />
    </div>
  );
};
