import React from 'react';
import { preload } from 'react-dom';
import { SITE_FOODIT } from 'fusion:environment';
import { useContent } from 'fusion:content';
import PreloadImages from '../../../../private-global/common/preloadImage/preloadImages';
import { getHomeOpeningImages, getPromoItemsImages } from './_helper';
import { PreloadAcuFirstImage } from './components/preloadAcuFirstImage';
import get from '../../../../../private/common/utils/get';
import filter from '../../../../../../content/filters/foodit/chefs';
import { ejesHomeMock } from '../../subcategorias/helpers';

const componentRequiredLayouts = {
    'Foodit-home': ({ renderables, isAdmin, contextPath, deployment }) => {
        const openingImages = getHomeOpeningImages(renderables, isAdmin);

        const assetsPath = file =>
            deployment(
                `${contextPath}/resources/foodit/assets/images/ejes/${file}`
            );

        const firstEjeImage =
            ejesHomeMock.length > 0
                ? [
                      {
                          resizedUrl: assetsPath(ejesHomeMock[0].imageProps.src)
                      }
                  ]
                : [];

        const criticalImages = [...openingImages, ...firstEjeImage];

        return <PreloadImages resizedUrls={criticalImages} />;
    },
    'Foodit-acumulado': ({ globalContent }) => {
        const { _id: id = '', articles = [] } = globalContent;
        if (id === '/tema') {
            const [firstArticle = {}] = articles;
            const temaHref = firstArticle?.promo_image
                ? `${SITE_FOODIT}${firstArticle.promo_image}`
                : null;
            if (temaHref)
                preload(temaHref, { as: 'image', fetchPriority: 'high' });
            return null;
        }

        return <PreloadAcuFirstImage id={id} layout="Foodit-acumulado" />;
    },
    'Foodit-chef': ({ globalContent }) => {
        const { image: { url: imageUrl = '' } = {} } = globalContent;
        if (imageUrl) preload(imageUrl, { as: 'image', fetchPriority: 'high' });
        return null;
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
        if (imageUrl) preload(imageUrl, { as: 'image', fetchPriority: 'high' });
        return null;
    }
};
function PreloadFooditImages({
    layout = '',
    renderables = [],
    globalContent = {},
    isAdmin = false,
    contextPath = '',
    deployment = () => {}
}) {
    if (componentRequiredLayouts[layout])
        return componentRequiredLayouts[layout]({
            globalContent,
            renderables,
            isAdmin,
            contextPath,
            deployment
        });

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

export default PreloadFooditImages;
