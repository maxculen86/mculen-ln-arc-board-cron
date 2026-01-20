/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
// TODO: REFACTOR ES-LINT RULES
import React from 'react';
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
import { getResizedUrls, getResizerUrlJw } from './_helper';
import PreloadAcuDeportes from '../../../../LN/acumulado/preloadAcuDeportes';
import { shouldPreloadForSubtype } from '../../subtypes/subtypeHelper';
import getOpeningResizedUrls from '../../../../../layouts/LN-nota-storytelling-v2/helpers/getOpeningResizedUrls';
import siteProperties from '../../../../../../properties/sites/la-nacion-ar';

const STORYTELLING_V2_LAYOUT = get(
    siteProperties,
    'layoutsName.StoryTellingV2',
    ''
);

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

    if (!data) return <></>;

    const sectionData = {
        Nota: () => {
            if (!shouldPreloadForSubtype(subtype)) return <></>;

            const resizedUrls =
                layout === STORYTELLING_V2_LAYOUT
                    ? getOpeningResizedUrls(promoItems)
                    : getResizedUrls(subtype, promoItems, basic);

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

                if (!collectionId && !articleId) return <></>;

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

            if (notPreload) return <></>;

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
        // TODO: REVISAR SI SE USA PARA ELIMINAR
        Video: () => (
            <LinkImagePreload
                resizedUrls={getResizedUrls(subtype, promoItems, basic)}
            />
        ),
        VideoJw: () => (
            <LinkImagePreload resizedUrls={getResizerUrlJw(promoItems)} />
        )
    };
    const sectionAsComponent = capitalizeFirstLetter(section);

    return (
        (sectionData[sectionAsComponent] &&
            sectionData[sectionAsComponent]()) || <></>
    );
}

export default GetDataToLinkImage;
