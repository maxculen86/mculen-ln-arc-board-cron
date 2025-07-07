import React, { useMemo } from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import PropTypes from 'fusion:prop-types';
import { cx } from '@ln/cva';
import EpigraphComponent from '../../../foodit-global/common/epigraph/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { getFooditAuthor } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';
import {
    headerLevels,
    normalize,
    PREPARATION_KEYWORDS,
    TIPS_KEYWORDS
} from './helpers';

export function Image({ data = {}, contentElements = [] }) {
    const {
        caption = '',
        resized_urls: resizedUrls = [],
        url = '',
        _id: imageId = ''
    } = data || {};

    const { resizedUrl = '' } = getShortestImage(resizedUrls);

    const belongsToPreparation = useMemo(() => {
        if (!imageId || contentElements.length === 0) {
            return false;
        }

        let inPreparationSection = false;
        let preparationHeaderLevel = null;

        for (let i = 0; i < contentElements.length; i += 1) {
            const element = contentElements[i];

            if (
                element.type === 'header' &&
                headerLevels.includes(element.level)
            ) {
                const headerContent = normalize(element.content || '');

                const isPreparation = PREPARATION_KEYWORDS.some(keyword =>
                    typeof keyword === 'string'
                        ? headerContent.includes(normalize(keyword))
                        : keyword.test(headerContent)
                );

                const isTips = TIPS_KEYWORDS.some(tip =>
                    headerContent.includes(tip)
                );

                if (isPreparation) {
                    inPreparationSection = true;
                    preparationHeaderLevel = element.level;
                } else if (
                    inPreparationSection &&
                    (element.level <= preparationHeaderLevel || isTips)
                ) {
                    inPreparationSection = false;
                    preparationHeaderLevel = null;
                }
            }

            if (element.type === 'image' && element._id === imageId) {
                return inPreparationSection;
            }
        }

        return false;
    }, [contentElements, imageId]);

    const imageConfig = useMemo(() => {
        const baseConfig = {
            className: 'w-100 ratio-3-2 content-image',
            section: 'contenido'
        };

        if (belongsToPreparation) {
            return {
                className: 'preparation-image w-100 w-364_md',
                section: 'preparacion'
            };
        }

        return baseConfig;
    }, [belongsToPreparation]);

    const imageSrc = resizedUrl || url;
    const imageAlt = getImageAltText(data);
    const imageSources = getImagesToLoadWithPicture(false, resizedUrls);

    if (!imageSrc) {
        return null;
    }

    const imageClassName = cx('flex flex-column gap-8', {
        '-mt-20': imageConfig.section === 'preparacion'
    });

    return (
        <figure
            className={imageClassName}
            data-image-section={imageConfig.section}
        >
            <FooditImage
                className={imageConfig.className}
                src={imageSrc}
                alt={imageAlt}
                fetchPriority="low"
                loading="lazy"
                sources={imageSources}
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
        url: PropTypes.string,
        _id: PropTypes.string,
        additional_properties: PropTypes.object
    }).isRequired,
    contentElements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            type: PropTypes.string,
            content: PropTypes.string,
            level: PropTypes.number,
            additional_properties: PropTypes.shape()
        })
    ).isRequired
};

export default Image;
