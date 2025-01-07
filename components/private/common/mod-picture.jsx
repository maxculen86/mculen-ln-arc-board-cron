import React from 'react';
import PropTypes from 'prop-types';

import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import ComPicture from './com-picture';
import ComImage from './com-image';
import ModVideo from './mod-video';
import {
    getSizes,
    getImagesToLoadWithPicture
} from '../LN/common/utils/mediaHelper';
import '../../../resources/dist/css/ln/modules/mod-picture.css';

function ModImage(props) {
    const {
        src,
        alt,
        classCondition,
        video,
        sources,
        isApertura,
        isLoadWithPicture,
        imageListForPicture,
        imgDefault
    } = props;

    const srcSet = sources
        ? sources.map(x => `${x.resizedUrl} ${x.option.width}w`).join()
        : '';

    const sizesImg = getSizes(sources);

    return (
        <ComPicture
            classCondition={classCondition}
            video={video ? '--video-background' : ''}
        >
            {isLoadWithPicture && !video && (
                <div className="com-image">
                    <Adaptableimage
                        alt={alt}
                        src={imgDefault}
                        className="com-image"
                        fetchPriority="high"
                        loading="eager"
                        sources={getImagesToLoadWithPicture(
                            imageListForPicture
                        )}
                    />
                </div>
            )}
            {!isLoadWithPicture && (
                <ComImage
                    srcset={srcSet}
                    src={src}
                    alt={alt}
                    sizes={!sizesImg || `${sizesImg},100vw`}
                    isApertura={isApertura}
                />
            )}
            {video ? <ModVideo image={src} video={video} /> : <></>}
        </ComPicture>
    );
}

ModImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    video: PropTypes.string,
    isApertura: PropTypes.bool,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            option: PropTypes.shape({
                media: PropTypes.string
            }),
            resizedUrl: PropTypes.string
        })
    ),
    sizes: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    isLoadWithPicture: PropTypes.bool,
    imageListForPicture: PropTypes.arrayOf(
        PropTypes.shape({
            option: PropTypes.shape({
                media: PropTypes.string
            }),
            resizedUrl: PropTypes.string
        })
    ),
    imgDefault: PropTypes.string
};

ModImage.defaultProps = {
    alt: '',
    classCondition: '',
    video: '',
    sources: [],
    sizes: {},
    isApertura: false,
    isLoadWithPicture: false,
    imageListForPicture: [],
    imgDefault: ''
};

export default ModImage;
