import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';
import ComPicture from '../../../../common/com-picture';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';
import { getImageData } from '../../../../../features/LN/common/image/_helpers/getImageData';

function ImageArticle(props) {
    const { image, href, active, isApertura, isAperturaNota, searchableField } =
        props;

    const wwwImage = isApertura ? replaceUrlResizerToWWW(image) : image;

    if (!wwwImage?.url) return null;

    const sources = wwwImage.resized_urls?.filter(v => !!v.option) || [];

    const sourcesZoom =
        wwwImage.resized_urls_zoom?.filter(v => !!v.option) || [];

    const sourceActive = active ? sourcesZoom : sources;

    const imageData = getImageData(
        {
            ...wwwImage,
            resized_urls: sourceActive
        },
        { isAperturaNota }
    );

    if (!imageData) return null;

    const { src, srcset, sizes, width, height, alt, pictureSources } =
        imageData;

    return (
        <ComPicture href={href}>
            <div
                className={cx('com-image', {
                    'content-visibility-auto will-change-auto': isApertura
                })}
            >
                <Adaptableimage
                    width={width}
                    alt={alt}
                    height={height}
                    src={src}
                    className={cx('com-image', {
                        'will-change-auto': isApertura
                    })}
                    searchableField={searchableField}
                    fetchPriority={isApertura ? 'high' : 'low'}
                    loading={isApertura ? 'eager' : 'lazy'}
                    srcSet={srcset}
                    sizes={sizes}
                    sources={pictureSources}
                />
            </div>
        </ComPicture>
    );
}

export default ImageArticle;
