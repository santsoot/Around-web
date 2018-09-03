import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { POS_KEY } from '../constants'
import { AroundMarker } from './AroundMarker'

class AroundMap extends React.Component {

    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        return(
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat, lng: lon }}
            >
            <AroundMarker position={{lat: lat, lon: lon - 0.06}} content = 'Home'/>
            <AroundMarker position={{lat: lat - 0.05, lon: lon - 0.2}} content = 'USC'/>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));