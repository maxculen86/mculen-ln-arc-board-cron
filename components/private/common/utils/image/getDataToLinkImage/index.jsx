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
    excludePreloadAcu
} from '../../preloadHelper';
import { getUltimasNoticiasSectionsIds } from '../../../../../features/LN-acumulado/tagList';
import BuildHomePreloadImages from './_children/BuildHomePreloadImages';
import { getResizedUrls } from './_helper';
import isAllowedSection from '../../../../LN/common/utils/isAllowedSection';
import allowSectionAndLayout from '../../../../LN/common/media/helpers/allowSectionAndLayout';

const GetDataToLinkImage = ({
    data = {},
    section = '',
    renderables = [],
    arcSite = '',
    isAdmin = false,
    layout,
    isHomeLN10 = false
}) => {
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

    const isValidSection = isAllowedSection({
        globalContent: data,
        listOfAllowedSection: allowSectionAndLayout,
        layout
    });

    const basic = replaceUrlResizerToWWW(get(data, 'promo_items.basic', {}));
    const isAuthor = nodeType === 'author';

    if (!data) return <></>;

    const sectionData = {
        Nota: () => {
            const resizedUrls = getResizedUrls(subtype, promoItems, basic);

            return (
                <LinkImagePreload
                    isLoadWithPicture={isValidSection}
                    resizedUrls={resizedUrls}
                />
            );
        },

        Acumulado: () => {
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
                            imagesrcset={urlImage}
                        />
                    )
                );
            }
            const hasFeatureAcumuladoApertura = haveFeatureAcumuladoApertura(
                renderables
            );
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
                    isLoadWithPicture={isValidSection}
                />
            );
        },
        Home: () => {
            return (
                <BuildHomePreloadImages
                    renderables={renderables}
                    arcSite={arcSite}
                    isAdmin={isAdmin}
                    isHomeLN10={isHomeLN10}
                    layout={layout}
                />
            );
        },
        Video: () => (
            <LinkImagePreload
                resizedUrls={getResizedUrls(subtype, promoItems, basic)}
            />
        )
    };
    const sectionAsComponent = capitalizeFirstLetter(section);

    return (
        (sectionData[sectionAsComponent] &&
            sectionData[sectionAsComponent]()) || <></>
    );
};

export default GetDataToLinkImage;
