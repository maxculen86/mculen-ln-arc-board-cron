import React, { useMemo } from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import PropTypes from 'fusion:prop-types';
import { cx } from '@ln/cva';
import { Text } from '@ln/common-ui-text';
import EpigraphComponent from '../../../foodit-global/common/epigraph/foodit';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import { getFooditAuthor } from '../../../foodit-global/common/utils/notaFooditHelper';
import getImageAltText from '../../../foodit-global/common/utils/getImageAltText';
import {
    headerLevels,
    processHeaderElement,
    useLastPreparationImageId
} from './helpers';

export function Image({ data = {}, contentElements = [] }) {
    const {
        caption = '',
        resized_urls: resizedUrls = [],
        url = '',
        _id: imageId = ''
    } = data || {};

    const { resizedUrl = '' } = getShortestImage(resizedUrls);
    const lastPreparationImageId = useLastPreparationImageId(contentElements);

    const belongsToPreparation = useMemo(() => {
        if (!imageId || !contentElements.length) return false;

        let state = {
            inPreparationSection: false,
            mainPreparationLevel: null
        };

        // eslint-disable-next-line no-restricted-syntax
        for (const element of contentElements) {
            if (
                element.type === 'header' &&
                headerLevels.includes(element.level)
            ) {
                state = processHeaderElement(element, state);
            }

            if (element.type === 'image' && element._id === imageId) {
                return state.inPreparationSection;
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
                className: 'preparation-image w-100 max-w-260_md max-w-286_lg',
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
        '-mt-16 pl-20 pr-20 pr-0_md': imageConfig.section === 'preparacion'
    });

    const isLastPreparationImage =
        belongsToPreparation && imageId === lastPreparationImageId;

    return (
        <>
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
                {data && !belongsToPreparation && (
                    <EpigraphComponent
                        credits={getFooditAuthor(data, true)}
                        caption={caption}
                    />
                )}
            </figure>

            {isLastPreparationImage && (
                <Text className="roboto roboto-bold text-16 italic">
                    Las imágenes utilizadas en la preparación de esta receta
                    fueron generadas con IA para Foodit con fines ilustrativos.
                </Text>
            )}
        </>
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
