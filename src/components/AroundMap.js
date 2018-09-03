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
                {
                    this.props.posts.map((post) => <AroundMarker key={post.url} post={post}/>)
                }
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));