import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { POS_KEY } from '../constants'

class AroundMap extends React.Component {

    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat, lng: lon }}
            >
                <Marker
                    position={{ lat, lng: lon }}
                />
                <Marker
                    position={{ lat: lat - 0.06, lng: lon - 0.2}}
                />
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));