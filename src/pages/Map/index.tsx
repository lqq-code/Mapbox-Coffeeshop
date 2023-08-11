import React, { useEffect, useState } from "react";
import { Button } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import AllAddr from "@/utils/allAddr";
import Style from "./index.less";
import icon from "../../../public/images/coffee.png";

export default () => {

  const handleInitial = () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3RldmFnZSIsImEiOiJjazZzd3V2dXEwNGZlM2xtZzFnOXdkOTFtIn0.pKVxwqE61gNc7PKK5u1j6g";
    const geojson = {
      'features': [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [121.426467,31.208235],
          },
          properties: {
            title: "Home",
            icon: "harbor",
            iconSize: [40, 40],
            description: 'Home',
          },
        },
      ]
    }
    //球体飞行
    const start = {
      center: [80, 36],
      zoom: 1,
      pitch: 0,
      bearing: 0,
    };
    const end = {
      center: [121.42, 31.22],
      zoom: 12.5,
      bearing: 130,
      pitch: 75,
    };

    var map = new mapboxgl.Map({
      // style: "mapbox://styles/stevage/ciz68fsec00112rpal5hjru07?refresh=1",
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      // center: [121.42, 31.22], //上海市长宁区
      // zoom: 11.5, //缩放级别
      // minZoom: 9,
      // maxZoom: 19,
      container: "map",
      // pitch: 60, // 俯视
      projection: "globe",
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
      ...start,
      
    });

    //旋转动画
    function rotateCamera(timestamp: any) {
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      requestAnimationFrame(rotateCamera);
    }

    //设置语言：中文
    var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
    map.addControl(language);

    map.on("load", function () {

      //球体
      map.setFog({
        color: "rgb(186, 210, 235)",
        'high-color': 'rgb(36, 92, 223)', 
        'horizon-blend': 0.02, 
        'space-color': 'rgb(11, 11, 25)', 
        'star-intensity': 0.6 
      });
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
      });
      map.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5,
      });

      // //动画
      // rotateCamera(0);
      // const layers = map.getStyle().layers;
      // for (const layer of layers) {
      //   if (layer.type === "symbol" && layer.layout["text-field"]) {
      //     map.removeLayer(layer.id);
      //   }
      // }

      //坐标点数据
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: AllAddr.coffeAddr,
        },
      });

      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        "source-layer": "building",
        layout: {
          "icon-image": "{icon}",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 20,
          "text-offset": [0, 0.6],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#50B4DB",
        },
      });

      //点击显示弹窗
      // const popup = new mapboxgl.Popup({
      //   closeButton: false,
      //   closeOnClick: false,
      // });

      // map.on("mouseenter", "places", (e: any) => {
      //   map.getCanvas().style.cursor = "pointer";
      //   const coordinates = e.features[0].geometry.coordinates.slice();
      //   const description = e.features[0].properties.description;
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //   }
      //   popup.setLngLat(coordinates).setHTML(description).addTo(map);
      // });

      // map.on("mouseleave", "places", () => {
      //   map.getCanvas().style.cursor = "";
      //   popup.remove();
      // });

      //飞行
      let isAtStart = true;
      document.getElementById("fly").addEventListener("click", () => {
        const target = isAtStart ? end : start;
        isAtStart = !isAtStart;
        map.flyTo({
          ...target,
          duration: 12000,
          essential: true,
        });
      });
    });
  };

  useEffect(() => {
    handleInitial();
  }, []);

  return (
    <div className={Style.mapContanier}>
      <div className={Style.leftItem}>
        <div className={Style.leftBg}>{AllAddr.bgText}</div>
        <h1>Changning District Café</h1>
        <Button id="fly" type="dashed">
          <span>One-Click Flight✈️</span>
        </Button>
      </div>
      <div id="map" className={Style.mapItem} />
    </div>
  );
};
