import React from 'react';
import PropTypes from 'fusion:prop-types';
import ImageArticle from '../imageArticle';
import VideoPlayer from '../../../common/videoPlayer';

const destacado = props => {
    const {
        globalContent: {
            imageResizePresets,
            promo_items: { basic }
        }
    } = props;

    if (basic) {
        switch (basic.type) {
            case 'image':
                return (
                    <ImageArticle
                        image={basic}
                        imageResizePresets={imageResizePresets}
                        zoom
                        configType="apertura"
                    />
                );
            case 'video':
                const { _id } = basic;
                return <VideoPlayer videoId={_id} />;
            default:
                return null;
        }
    } else {
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
