import React from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends React.Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }

    render() {
        const images = this.props.images.map(image => {
            return {
                ...image,
                customOverlay: (
                    <div className="captionStyle">
                       <div> {`${image.user}: ${image.caption}`} </div>
                    </div>
                )
            }
        });

        return (
            <div className="wrapperStyle">
                <GridGallery
                    images={images}
                    enableImageSelection={false}
                    backdropClosesModal={true}
                />
            </div>
        );
    }
}

