import React from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import PropTypes from 'fusion:prop-types';
import EpigraphComponent from '../../../foodit-global/common/epigraph/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { getFooditAuthor } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';

export function Image({ data }) {
    const {
        caption = '',
        resized_urls: resizedUrls = [],
        url = ''
    } = data || {};
    const { resizedUrl = '' } = getShortestImage(resizedUrls);

    return (
        <figure className="flex flex-column gap-8">
            <FooditImage
                className="w-100 ratio-3-2"
                src={resizedUrl || url}
                alt={getImageAltText(data)}
                fetchPriority="low"
                loading="lazy"
                sources={getImagesToLoadWithPicture(false, resizedUrls)}
            />
            {data && (
                <EpigraphComponent
                    credits={getFooditAuthor(data, true)}
                    caption={caption}
                />
            )}
        </figure>
    );
}

Image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        resized_urls: PropTypes.array,
        url: PropTypes.string
    })
};

Image.defaultProps = {
    data: {}
};

export default Image;
