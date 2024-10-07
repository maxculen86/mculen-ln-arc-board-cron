import React from 'react';
import PropTypes from 'fusion:prop-types';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';
import { PreloadAcuFirstImage } from './components/preloadAcuFirstImage';

const componentRequiredLayouts = {
    'Foodit-acumulado': globalContent => {
        const { _id: id = '' } = globalContent;

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
    layout: PropTypes.string.isRequired,
    renderables: PropTypes.isRequired,
    globalContent: PropTypes.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default PreloadFooditImages;
