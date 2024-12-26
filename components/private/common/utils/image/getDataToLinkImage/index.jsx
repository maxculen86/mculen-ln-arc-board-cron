import React from 'react';
import PropTypes from 'prop-types';
import get from '../../get';
import {
    LinkImagePreload,
    wikiImagesWithWWW,
    replaceAllUrlsResizerObject
} from '../../../../LN/common/utils/mediaHelper';
import replaceUrlResizerToWWW from '../../../../../../content/sources/utils/replaceUrlResizerToWWW';
import capitalizeFirstLetter from '../../capitalizeFirstLetter';
import ImagePreloadlAcu from '../../../../LN/acumulado/imagePreloadAcu';
import {
    verifyChainsBeforeGrid,
    getIdCollectionFromGC,
    haveFeatureAcumuladoApertura,
    getDataPreloadAcu,
    excludePreloadAcu,
    getFirstChainItem
} from '../../preloadHelper';
import { getUltimasNoticiasSectionsIds } from '../../../../../features/LN-acumulado/tagList';
import BuildHomePreloadImages from './_children/BuildHomePreloadImages';
import { getResizedUrls } from './_helper';
import PreloadAcuDeportes from '../../../../LN/acumulado/preloadAcuDeportes';

function getSectionData({
    section,
    data,
    renderables,
    arcSite,
    isAdmin,
    layout,
    basic,
    isAuthor,
    isDeportes,
    canonicalUrl,
    wikiSourceData,
    isWiki,
    nodeType,
    id,
    name,
    subtype,
    promoItems
}) {
    const handlers = {
        Nota: () => {
            const resizedUrls = getResizedUrls(subtype, promoItems, basic);
            return <LinkImagePreload resizedUrls={resizedUrls} />;
        },
        Acumulado: () => {
            if (isDeportes) {
                const {
                    collectionId = '',
                    initialPosition = 0,
                    articleId = '',
                    isFocal = false,
                    imageConfig,
                    imageId = ''
                } = getFirstChainItem(renderables);

                if (!collectionId && !articleId) return null;

                return (
                    <PreloadAcuDeportes
                        website={arcSite || 'la-nacion-ar'}
                        imageConfig={imageConfig}
                        articleId={articleId}
                        imageId={imageId}
                        collectionId={collectionId}
                        initialPosition={
                            initialPosition > 0 ? initialPosition - 1 : 0
                        }
                        isFocal={isFocal}
                    />
                );
            }
            if (isWiki) {
                const imagesToPreload = wikiImagesWithWWW(wikiSourceData);
                return <LinkImagePreload resizedUrls={imagesToPreload} />;
            }
            if (isAuthor) {
                const urlImage = replaceAllUrlsResizerObject(
                    get(data, 'image.url', null)
                );
                return (
                    urlImage && (
                        <link
                            rel="preload"
                            as="image"
                            fetchPriority="high"
                            href={urlImage}
                            imageSrcSet={urlImage}
                        />
                    )
                );
            }
            const hasFeatureAcumuladoApertura =
                haveFeatureAcumuladoApertura(renderables);
            const hasChainBeforeGrid = verifyChainsBeforeGrid(renderables);
            const idCollectionApertura = getIdCollectionFromGC({
                globalContent: data
            });
            const notPreload = excludePreloadAcu({
                nodeType,
                id,
                idCollectionApertura,
                hasFeatureAcumuladoApertura,
                hasChainBeforeGrid
            });

            if (notPreload) return null;

            const sectionsIds =
                id === '/ultimas-noticias'
                    ? getUltimasNoticiasSectionsIds(renderables)
                    : '';
            const dataPreloadAcu = getDataPreloadAcu(
                idCollectionApertura,
                nodeType
            );
            return (
                <ImagePreloadlAcu
                    {...dataPreloadAcu}
                    sectionsIds={sectionsIds}
                    arcSite={arcSite}
                    accumulated={{ id, canonicalUrl, name }}
                />
            );
        },
        Home: () => (
            <BuildHomePreloadImages
                renderables={renderables}
                arcSite={arcSite}
                isAdmin={isAdmin}
                layout={layout}
            />
        ),
        Video: () => (
            <LinkImagePreload
                resizedUrls={getResizedUrls(subtype, promoItems, basic)}
            />
        )
    };

    return handlers[section] || null;
}

function GetDataToLinkImage({
    data = {},
    section = '',
    renderables = [],
    arcSite = '',
    isAdmin = false,
    layout
}) {
    const {
        _id: id,
        name,
        subtype,
        promo_items: promoItems,
        canonical_url: canonicalUrl,
        wikiSourceData = {},
        isWiki = false,
        node_type: nodeType
    } = data || {};

    const basic = replaceUrlResizerToWWW(get(data, 'promo_items.basic', {}));
    const isAuthor = nodeType === 'author';
    const isDeportes = id === '/deportes';

    if (!data) return null;

    const sectionAsComponent = capitalizeFirstLetter(section);
    const sectionData = getSectionData({
        section: sectionAsComponent,
        data,
        renderables,
        arcSite,
        isAdmin,
        layout,
        basic,
        isAuthor,
        isDeportes,
        canonicalUrl,
        wikiSourceData,
        isWiki,
        nodeType,
        id,
        name,
        subtype,
        promoItems
    });

    return sectionData && sectionData();
}

GetDataToLinkImage.propTypes = {
    data: PropTypes.shape(),
    section: PropTypes.string,
    renderables: PropTypes.arrayOf(PropTypes.node),
    arcSite: PropTypes.string,
    isAdmin: PropTypes.bool,
    layout: PropTypes.string
}.isRequired;

export default GetDataToLinkImage;
