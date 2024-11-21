import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_FOODIT } from 'fusion:environment';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';
import { PreloadAcuFirstImage } from './components/preloadAcuFirstImage';

const componentRequiredLayouts = {
    'Foodit-acumulado': globalContent => {
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
    }
};
function PreloadFooditImages({
    layout = '',
    renderables = [],
    globalContent = {},
    isAdmin = false
}) {
    if (componentRequiredLayouts[layout])
        return componentRequiredLayouts[layout](globalContent);

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
