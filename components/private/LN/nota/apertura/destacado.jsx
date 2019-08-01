import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleImage from '../articleImage';
import VideoPlayer from '../../../common/videoPlayer';

const destacado = props => {
    const {
        globalContent: {
            imageResizePresets,
            promo_items: { basic }
        }
    } = props;

    switch (basic.type) {
        case 'image':
            return (
                <ArticleImage
                    image={basic}
                    imageResizePresets={imageResizePresets}
                    zoom
                />
            );
        case 'video':
            const { _id } = basic;
            return <VideoPlayer videoId={_id} />;
        default:
            return null;
    }
};

destacado.propTypes = {
    globalContent: PropTypes.shape({
        imageResizePresets: PropTypes.object,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired
};

export default destacado;
