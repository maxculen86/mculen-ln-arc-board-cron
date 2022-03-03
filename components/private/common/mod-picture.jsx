import React from 'react';
import PropTypes from 'prop-types';

import ComPicture from './com-picture';
import ComImage from './com-image';
import ModVideo from './mod-video';
import { getSizes } from '../LN/common/utils/mediaHelper';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ModImage = props => {
    const { src, alt, classCondition, video, amp, sources, isApertura } = props;

    const srcSet = sources
        .map(x => `${x.resizedUrl} ${x.option.width}w`)
        .join();

    const sizesImg = getSizes(sources);

    return (
        <ComPicture
            classCondition={classCondition}
            video={video ? '--video-background' : ''}
            amp={amp}
        >
            <ComImage
                srcset={srcSet}
                src={src}
                alt={alt}
                amp={amp}
                sizes={sizesImg}
                isApertura={isApertura}
            />
            {video ? <ModVideo image={src} video={video} /> : <></>}
        </ComPicture>
    );
};

ModImage.defaultProps = {
    alt: '',
    classCondition: '',
    amp: false,
    video: '',
    sources: []
};

ModImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    video: PropTypes.string,
    amp: PropTypes.bool,
    isApertura: PropTypes.bool,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            option: PropTypes.shape({
                media: PropTypes.string
            }),
            resizedUrl: PropTypes.string
        })
    )
};

ModImage.defaultProps = {
    isApertura: false
};

export default ModImage;
