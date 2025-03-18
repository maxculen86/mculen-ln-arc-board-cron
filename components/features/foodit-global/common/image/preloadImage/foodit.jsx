import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_FOODIT } from 'fusion:environment';
import { useContent } from 'fusion:content';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';
import { PreloadAcuFirstImage } from './components/preloadAcuFirstImage';
import get from '../../../../../private/common/utils/get';
import filter from '../../../../../../content/filters/foodit/chefs';

const componentRequiredLayouts = {
    'Foodit-acumulado': ({ globalContent }) => {
        const { _id: id = '', articles = [] } = globalContent;
        if (id === '/tema') {
            const [firstArticle = {}] = articles;
            return (
                <link
                    key={`${SITE_FOODIT}${firstArticle?.promo_image}`}
                    rel="preload"
                    as="image"
                    fetchPriority="high"
                    href={`${SITE_FOODIT}${firstArticle?.promo_image}`}
                />
            );
        }

        return <PreloadAcuFirstImage id={id} layout="Foodit-acumulado" />;
    },
    'Foodit-chef': ({ globalContent }) => {
        const { image: { url: imageUrl = '' } = {} } = globalContent;
        return (
            <link
                key={imageUrl}
                rel="preload"
                as="image"
                fetchPriority="high"
                href={imageUrl}
            />
        );
    },
    'Foodit-acumulado-chef': ({ renderables }) => {
        const firstCardChef = renderables.find(
            ({ type }) => type === 'foodit/CardChef'
        );
        const firstIdChef = get(firstCardChef, 'props.customFields.id', '');

        const author = useContent({
            source: 'chefsSource',
            query: {
                _id: firstIdChef,
                website: 'foodit'
            },
            filter,
            staticMode: true
        });

        const { image: { url: imageUrl } = {} } = author || {};
        return (
            <link
                key={imageUrl}
                rel="preload"
                as="image"
                fetchPriority="high"
                href={imageUrl}
            />
        );
    }
};
function PreloadFooditImages({
    layout = '',
    renderables = [],
    globalContent = {},
    isAdmin = false
}) {
    if (componentRequiredLayouts[layout])
        return componentRequiredLayouts[layout]({ globalContent, renderables });

    const imagesToPreload = {
        'Foodit-home': () => getHomeOpeningImages(renderables, isAdmin),
        'Foodit-ficha-receta': () => getPromoItemsImages(globalContent, layout),
        'Foodit-recipe-paywall': () =>
            getPromoItemsImages(globalContent, layout),
        'Foodit-ficha-nota': () => getPromoItemsImages(globalContent, layout)
    };

    const resizedUrls =
        (imagesToPreload[layout] && imagesToPreload[layout]()) || [];

    return <PreloadImages resizedUrls={resizedUrls} />;
}

PreloadFooditImages.propTypes = {
    layout: PropTypes.string,
    renderables: PropTypes.array,
    globalContent: PropTypes.object,
    isAdmin: PropTypes.bool
};

PreloadFooditImages.defaultProps = {
    layout: '',
    renderables: [],
    globalContent: {},
    isAdmin: false
};

export default PreloadFooditImages;
