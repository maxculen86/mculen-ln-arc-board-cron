import React from 'react';
import PropTypes from 'prop-types';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import ComPicture from './com-picture';
import ModVideo from './mod-video';
import { getImagesToLoadWithPicture } from '../LN/common/utils/mediaHelper';
import '../../../resources/dist/css/ln/modules/mod-picture.css';

function ModImage(props) {
    const { src, alt, classCondition, video, imageListForPicture, imgDefault } =
        props;

    return (
        <ComPicture
            classCondition={classCondition}
            video={video ? '--video-background' : ''}
        >
            {video ? (
                <ModVideo image={src} video={video} />
            ) : (
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
        </ComPicture>
    );
}

ModImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    classCondition: PropTypes.string,
    video: PropTypes.string,
    sizes: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
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
    sizes: {},
    imageListForPicture: [],
    imgDefault: ''
};

export default ModImage;
