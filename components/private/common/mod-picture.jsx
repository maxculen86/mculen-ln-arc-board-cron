import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import ComPicture from './com-picture';
import ModVideo from './mod-video';
import { getImagesToLoadWithPicture } from '../LN/common/utils/mediaHelper';
import '../../../resources/dist/css/ln/modules/mod-picture.css';

function ModImage({
    src,
    alt = '',
    classCondition = '',
    video = '',
    imageListForPicture = [],
    imgDefault = ''
}) {
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
                            false,
                            imageListForPicture
                        )}
                    />
                </div>
            )}
        </ComPicture>
    );
}

export default ModImage;
