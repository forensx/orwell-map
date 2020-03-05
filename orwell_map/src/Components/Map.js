import React from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, TextLayer, PolygonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import "./Map.css";

// import data
import locations from "../datafiles/location_points.json";
import factions from "../datafiles/county_polygons.json";

// dictonary for customization such as colors
var themes = {
  text_color: "#FFFFFF",

  // location themes
  location_color: [255, 0, 255],
  location_size: 20,
  location_opacity: 0.2,

  // polygon themes
  poly_outline: [0, 0, 0],
  poly_linewidth: 50,
  poly_opacity: 0.05
};

// set mapbox token
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWV0YWxtdWxpc2hhMjA1IiwiYSI6ImNqa3p6MnMxZzB6aXMzd3FqNzIydGQ1eWQifQ.Q7-btpPLCXJol5KEae2fjA";

// Initial viewport settings
const initialViewState = {
  longitude: -0.1278,
  latitude: 51.5074,
  zoom: 12,
  pitch: 0,
  bearing: 0
};

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  _renderTooltip() {
    const { path, hoveredObject, pointerX, pointerY, hoverType } =
      this.state || {};
    var message = [];
    try {
      if (hoverType === "point") {
        message.push(hoveredObject.coordinates[1], "°", ", ", hoveredObject.coordinates[0], "°");
      } else if (hoverType === "polygon") {
        message.push(hoveredObject.name);
      }
    } catch {}
    var toReturn = hoveredObject && (
      <div
        className="tooltip"
        style={{
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          left: pointerX + 10,
          top: pointerY,
          color: themes.text_color
        }}
      >
        {message}
      </div>
    );
    return toReturn;
  }
  render() {
    const layers = [
      // add map layers here
      new PolygonLayer({
        id: "factions",
        data: factions,
        pickable: true,
        stroked: true,
        filled: true,
        opacity: themes.poly_opacity,
        extruded: false,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: d => d.contours,
        getLineColor: themes.poly_outline,
        getFillColor: d => d.color,
        getLineWidth: themes.poly_linewidth,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y,
            hoverType: "polygon"
          })
      }),
      new ScatterplotLayer({
        id: "locations",
        data: locations,
        pickable: true,
        opacity: themes.location_size,
        radiusScale: themes.location_size,
        radiusScale: 15,
        radiusMinPixels: 10,
        radiusMaxPixels: 20,
        getPosition: d => d.coordinates,
        getFillColor: d => themes.location_color,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y,
            hoverType: "point"
          })
      }),
      new TextLayer({
        id: "orwell-locations-text",
        data: locations,
        getPosition: d => d.coordinates,
        getText: d => d.LOCATION_NAME,
        getTextAnchor: "middle",
        getAlignmentBaseline: "center",
        getSize: 20,
        getColor: [255, 255, 255]
      })
    ];
    return (
      <div className="Map">
        {/* Mr. Clayton, your comment is over there. */}
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layers}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v10"
          />
          {this._renderTooltip()}
        </DeckGL>
        <div
          className="controlPanel"
          style={{
            width: 200,
            height: 150,
            alignContent: "left",
            display: "flex",
            flexDirection: "column",
            fontFamily: "serif",
            fontSize: 13
          }}
        >
          <div
            className="macias"
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: -55,
              marginTop: -15
            }}
          >
            <div className="maciasText">
              <pre>Proleville</pre>
            </div>
            <div
              className="maciasLegend"
            >
              <div
                className="line blue"
              >
              </div>
            </div>
          </div>
          <div
            className="villa"
            style={{ display: "flex", flexDirection: "row", marginLeft: -55 }}
          >
            <div className="villaText">
              <pre>Outer Party</pre>
            </div>
            <div
              className="villaLegend"
            >
              <div
                className="line green"
              >
              </div>
            </div>
          </div>
          <div
            className="obregon"
            style={{ display: "flex", flexDirection: "row", marginLeft: -55 }}
          >
            <div className="obregonText">
              <pre>Inner Party</pre>
            </div>
            <div
              className="obregonLegend"
            >
              <div
                className="line black"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
