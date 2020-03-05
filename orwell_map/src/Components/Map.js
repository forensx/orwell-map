import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, TextLayer, PolygonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import "./Map.css";

// import data 
import locations from "../datafiles/location_points.json";
import factions from "../datafiles/county_polygons.json";

// set mapbox token
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibWV0YWxtdWxpc2hhMjA1IiwiYSI6ImNqa3p6MnMxZzB6aXMzd3FqNzIydGQ1eWQifQ.Q7-btpPLCXJol5KEae2fjA";

// Initial viewport settings
const initialViewState = {
    longitude: -0.1278,
    latitude: 51.5074,
    zoom: 10.5,
    pitch: 0,
    bearing: 0
};

// const layer = new PolygonLayer({
//     id: 'faction-lines',
    
// })

class Map extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    };

    _renderTooltip() {
        const { path, hoveredObject, pointerX, pointerY, hoverType } = this.state || {};
        var message = []
        try{
            if (hoverType === "point"){
                message.push(hoveredObject.LOCATION_NAME);
            }
            else if (hoverType === "polygon"){
                message.push(hoveredObject.FACTION);
            }
        }
        catch{

        }
        var toReturn = hoveredObject && (
            <div className="tooltip" style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY }}>
                {message}
            </div>
        )
        return toReturn;
    }
    render() {
        const layers = [
            // add map layers here
            new ScatterplotLayer({
                id: 'locations',
                data: locations,
                pickable: true,
                opacity: 0.4,
                radiusScale: 15,
                radiusMinPixels: 10,
                radiusMaxPixels: 20,
                getPosition: d => d.coordinates,
                getFillColor: d => [0, 0, 0],
                onHover: info => this.setState({
                    hoveredObject: info.object,
                    pointerX: info.x,
                    pointerY: info.y,
                    hoverType: "point",
                })
            }),
            new PolygonLayer({
                id: 'factions',
                data: factions,
                pickable: true,
                stroked: true,
                filled: true,
                extruded: false,
                wireframe: true,
                lineWidthMinPixels: 1,
                getPolygon: d => d.contours,
                getLineColor: [0, 0, 0],
                getFillColor: d => d.COLOR,
                getLineWidth: 250,
                onHover: info => this.setState({
                    hoveredObject: info.object,
                    pointerX: info.x,
                    pointerY: info.y,
                    hoverType: "polygon",
                })
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
                    <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                        mapStyle="mapbox://styles/metalmulisha205/ck7e0k6qb02lu1iobx3blg1en" />
                    {this._renderTooltip()}
                </DeckGL>
            </div>
        );
    }
}

export default Map