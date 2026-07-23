import React from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import EpigraphComponent from '../../../foodit-global/common/epigraph/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { getFooditAuthor } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';

function ConsecutiveImages({ images }) {
    if (!images || images.length !== 2) return null;

    const renderSingleImage = imageData => {
        const {
            caption = '',
            resized_urls: resizedUrls = [],
            url = ''
        } = imageData || {};
        const { resizedUrl = '' } = getShortestImage(resizedUrls);

        return (
            <figure className="flex flex-column gap-8">
                <FooditImage
                    className="w-100 ratio-3-2"
                    src={resizedUrl || url}
                    alt={getImageAltText(imageData)}
                    fetchPriority="low"
                    loading="lazy"
                    sources={getImagesToLoadWithPicture(false, resizedUrls)}
                />
                {imageData && (
                    <EpigraphComponent
                        credits={getFooditAuthor(imageData, true)}
                        caption={caption}
                    />
                )}
            </figure>
        );
    };

    return (
        <section className="content image-group">
            {images.map(image => (
                <div key={image.url} className="flex flex-column gap-16">
                    {renderSingleImage(image)}
                </div>
            ))}
        </section>
    );
}

export default ConsecutiveImages;
