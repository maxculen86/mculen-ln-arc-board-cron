import React from 'react';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';
import { PreloadAcuFirstImage } from './components/preloadAcuFirstImage';

const PreloadFooditImages = ({
    layout = '',
    renderables = [],
    globalContent = {},
    isAdmin
}) => {
    const componentRequiredLayouts = {
        'Foodit-acumulado': () => {
            const { _id: id = '' } = globalContent;

            return <PreloadAcuFirstImage id={id} layout={layout} />;
        }
    };

    if (componentRequiredLayouts[layout])
        return componentRequiredLayouts[layout]();

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
