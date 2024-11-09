import { FC, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import "ol/ol.css";
import { fromCoordsToArray, fromEPSG4326toEPSG3857 } from "./change_proj";

export const MapComponent: FC = () => {
  useEffect(() => {
    const yakutsk = fromCoordsToArray(
      fromEPSG4326toEPSG3857({
        longitude: 129.732,
        latitude: 62.0272,
      }),
    );

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });
    const map = new Map({
      target: "map",
      layers: [osmLayer],
      view: new View({
        center: yakutsk,
        zoom: 14,
      }),
    });
    console.log(yakutsk);
    return () => map.dispose();
  }, []);

  return <div style={{ height: "600px", width: "800px" }} id="map" />;
};
