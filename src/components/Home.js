import React from 'react';
import $ from 'jquery';
import { Tabs, Spin, Row, Col } from 'antd';
import { GEO_OPTIONS, POS_KEY, API_ROOT, TOKEN_KEY, AUTH_PREFIX } from '../constants';
import { Gallery } from './Gallery';
import { CreatePostButton } from './CreatePostButton';
import { WrappedAroundMap } from './AroundMap';

const TabPane = Tabs.TabPane;

export class Home extends React.Component {

    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: []
    }

    componentDidMount() {
        this.setState({loadingGeoLocation: true, error: ''});
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            )
        } else {
            this.setState({ error: 'Your Browser Does Not Support GeoLocation!' });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.setState({loadingGeoLocation: false, error: ''});
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
            this.setState({loadingGeoLocation: false, error: 'failed to get user location'});
    }

    getPanelContent = (type) => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip= 'Loading GeoLocation...' />
        } else if (this.state.loadingPosts) {
            return <Spin tip='Loading Posts...'/>
        } else if (this.state.posts && this.state.posts.length > 0) {
            if (type === 'image') {
                return this.getImagePosts();
            } else {
                return this.getVideoPosts();
            }
        } else {
            return <div>Found Nothing...</div>;
        }
    }

    getImagePosts = () => {
        const images = this.state.posts
            .filter((post) => post.type === 'image')
            .map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message
                }
            });
        return <Gallery images={images}/>;
    }

    getVideoPosts = () => {
        return (
        <Row gutter={24}>
            {
                this.state.posts
                    .filter((post) => post.type === 'video')
                    .map((post) => (
                        <Col span={6} key={post.url}>
                            <video src={post.url} controls className='video-block'/>
                        </Col>))
            }
        </Row>
        );
    }

    loadNearbyPosts = (center, radius) => {
        this.setState({ loadingPosts: true, error: ''});
        const { lat, lon } = center ? center : JSON.parse(localStorage.getItem(POS_KEY));
        const range = radius ? radius : 20;
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${range}`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) => {
            const posts = response ? response : [];
            this.setState({ posts, loadingPosts: false, error: '' });
            console.log(response);
        }, (error) => {
            this.setState({ loadingPosts: false, error: error.responseText });
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }



    render() {
        const operations = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
        return (
              <Tabs tabBarExtraContent={operations} className = "main-tabs">
                  <TabPane tab="Image" key="1">
                      {this.getPanelContent('image')}
                  </TabPane>
                  <TabPane tab="video" key ="2">
                      {this.getPanelContent('video')}
                  </TabPane>
                  <TabPane tab="Map" key="3">
                    <WrappedAroundMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        posts={this.state.posts}
                        loadNearbyPosts={this.loadNearbyPosts}
                    />
                  </TabPane>
              </Tabs>
        );
    }
}