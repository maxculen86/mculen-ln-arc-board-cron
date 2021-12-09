import React from 'react';
import PropTypes from 'prop-types';

import ComPicture from './com-picture';
import ComSource from './com-source';
import ComImage from './com-image';
import ModVideo from './mod-video';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ModImage = props => {
    const {
        media,
        src,
        srcset,
        alt,
        classCondition,
        video,
        amp,
        sizes = {},
        sources,
        isApertura
    } = props;

    return (
        <ComPicture
            classCondition={classCondition}
            video={video ? '--video-background' : ''}
            amp={amp}
        >
            {!amp && !sources && srcset ? (
                <ComSource media={media} srcset={srcset} />
            ) : (
                <></>
            )}
            {!amp &&
                sources &&
                sources.map(source => (
                    <ComSource
                        media={source.option.media}
                        srcset={source.resizedUrl}
                    />
                ))}
            <ComImage src={src} alt={alt} amp={amp} {...sizes} isApertura />
            {video ? <ModVideo image={src} video={video} /> : <></>}
        </ComPicture>
    );
};

ModImage.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string.isRequired,
    media: PropTypes.string,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    video: PropTypes.string,
    amp: PropTypes.bool,
    isApertura: PropTypes.bool,
    sources: PropTypes.shape({
        option: PropTypes.shape({
            media: PropTypes.string
        }),
        resizedUrl: PropTypes.string
    })
};

ModImage.defaultProps = {
    isApertura: false
};

export default ModImage;
