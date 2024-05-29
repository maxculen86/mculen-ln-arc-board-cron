import React from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import Epigraph from '../../../foodit-global/common/epigraph/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { getFooditAuthor } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';

export const Image = ({ data }) => {
    const { caption = '', resized_urls = [], url = '' } = data || {};
    const { resizedUrl = '' } = getShortestImage(resized_urls);

    return (
        <figure className={`flex flex-column gap-8`}>
            <FooditImage
                className="w-100 ratio-3-2"
                src={resizedUrl || url}
                alt={getImageAltText(data)}
                fetchPriority="low"
                loading="lazy"
                sources={getImagesToLoadWithPicture(resized_urls)}
            />
            {data && (
                <Epigraph
                    credits={getFooditAuthor(data, true)}
                    caption={caption}
                />
            )}
        </figure>
    );
};

export default Image;
