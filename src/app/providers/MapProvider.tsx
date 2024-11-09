import { Clusterer } from "@2gis/mapgl-clusterer";
import { Map } from "@2gis/mapgl/types";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface MapContext {
  mapInstance: Map | undefined;
  zoom: number;
  cluster: Clusterer | undefined;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setMapInstance: Dispatch<SetStateAction<Map | undefined>>;
  setCluster: Dispatch<SetStateAction<Clusterer | undefined>>;
}

const defaultValues: MapContext = {
  mapInstance: undefined,
  cluster: undefined,
  zoom: 12,
  setMapInstance: () => null,
  count: 0,
  setCount: () => null,
  setCluster: () => null,
};

export const MapContext = createContext(defaultValues);
export const MapProvider: FC<PropsWithChildren> = (props) => {
  const [mapInstance, setMapInstance] = useState<Map | undefined>(undefined);
  const [cluster, setCluster] = useState<Clusterer | undefined>(undefined);
  const [count, setCount] = useState<number>(0);

  return (
    <MapContext.Provider
      value={{
        mapInstance,
        setMapInstance,
        zoom: defaultValues.zoom,
        cluster,
        count,
        setCount,
        setCluster,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};
