import React from 'react';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';

const PreloadFooditImages = ({
    layout = '',
    renderables = [],
    globalContent = {},
    isAdmin
}) => {
    const imagesToPreload = {
        'Foodit-home': () => {
            return getHomeOpeningImages(renderables, isAdmin);
        },
        'Foodit-ficha-receta': () => {
            return getPromoItemsImages(globalContent, layout);
        },
        'Foodit-ficha-nota': () => {
            return getPromoItemsImages(globalContent, layout);
        }
    };

    const resizedUrls =
        (imagesToPreload[layout] && imagesToPreload[layout]()) || [];

    return <PreloadImages resizedUrls={resizedUrls} />;
};

export default PreloadFooditImages;
