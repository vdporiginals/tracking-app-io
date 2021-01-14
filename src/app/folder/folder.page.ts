import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import * as turf from "@turf/turf";
import * as polyline from "@mapbox/polyline";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(directions);

    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }

  resizeMap(ev, map) {
    const direction = new directions({
      accessToken: environment.mapboxToken,
      unit: "metric",
      profile: "mapbox/driving",
      alternatives: "true",
      geometries: "geojson",
    });
    ev.resize();
    ev.addControl(direction, "top-right");
    for (let i = 0; i <= 2; i++) {
      ev.addSource("route" + i, {
        type: "geojson",
        data: {
          type: "Feature",
        },
      });

      ev.addLayer({
        id: "route" + i,
        type: "line",
        source: "route" + i,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#cccccc",
          "line-opacity": 0.5,
          "line-width": 13,
          "line-blur": 0.5,
        },
      });
    }

    direction.on("route", (e) => {
      let routes = e.route;
      // console.log(routes);
      for (let i = 0; i < 3; i++) {
        ev.setLayoutProperty("route" + i, "visibility", "none");
      }

      routes.forEach(function (route, i) {
        route.id = i;
      });
      routes.forEach((e) => {
        //Make each route visible, by setting the opacity to 50%.
        ev.setLayoutProperty("route" + e.id, "visibility", "visible");

        //Get GeoJson LineString feature of route
        var routeLine = polyline.toGeoJSON(e.geometry);
        console.log(routeLine);
        const newCord = [
          {
            coordinates: [[105.83416, 21.027763]],
            type: "LineString",
          },
        ];
        //Update the data for the route, updating the visual.
        ev.getSource("route" + e.id).setData(routeLine);

        ev.setPaintProperty("route" + e.id, "line-color", "#74c476");
      });
    });
  }
}
