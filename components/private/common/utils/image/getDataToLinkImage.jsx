import React from 'react';
import getProperties from 'fusion:properties';
import get from '../get';
import getImage from './getImage';
import { getChildsFromSections } from '../../../LN/common/utils/homeHelper';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';
import { STORYTELLING } from '../subtypes/subtypeHelper';
import {
    LinkImagePreload,
    wikiImagesWithWWW,
    replaceAllUrlsResizerArray,
    replaceAllUrlsResizerObject
} from '../../../LN/common/utils/mediaHelper';
import getVideoPosterResized from '../video/getVideoPosterResized';
import replaceUrlResizerToWWW from '../../../../../content/sources/utils/replaceUrlResizerToWWW';
import capitalizeFirstLetter from '../capitalizeFirstLetter';
import ImagePreloadlAcu from '../../../LN/acumulado/imagePreloadAcu';
import {
    verifyChainsBeforeGrid,
    getIdCollectionFromGC,
    haveFeatureAcumuladoApertura,
    getDataPreloadAcu
} from '../preloadHelper';

const getSource = ({
    imageID = '',
    noteID = '',
    imageConfig,
    isHideImage,
    videoID,
    isAdmin
}) => {
    const isInApertura = true;
    if (videoID) {
        return getVideoPosterResized(
            videoID,
            imageConfig,
            isInApertura,
            isAdmin
        );
    }
    return imageID.trim()
        ? getImage({
              id: imageID.trim(),
              sourceType: 'relatedImageSource',
              imageConfig,
              isHideImage,
              isInApertura,
              isAdmin
          })
        : getImage({
              id: noteID.trim(),
              sourceType: 'articleSourceNota',
              imageConfig,
              isHideImage,
              isInApertura,
              isAdmin
          });
};

const getcustomFieldsData = fieldsData => {
    return {
        isHideImage: get(fieldsData, 'props.customFields.hideImage', false),
        imageID: get(fieldsData, 'props.customFields.imageId', '').trim(),
        noteID: get(fieldsData, 'props.customFields.noteId', '').trim(),
        videoID: get(fieldsData, 'props.customFields.video', '')
    };
};

const getPromoItems = items => {
    return get(items, 'promo_items.basic.resized_urls', []).map(elem => {
        return {
            resizedUrl: get(elem, 'resizedUrl', ''),
            media: get(elem, 'option.media_preload', ''),
            // TODO: Evaluar no pasar Media
            option: elem.option
        };
    });
};

const getMediaBomba = (arcSite, bomba) => {
    const { isHideImage, imageID, noteID } = getcustomFieldsData(bomba[0]);

    const imageConfig = get(
        getProperties(arcSite),
        `cajaTemaConfig.bomba1.articles[0].imageConfig`,
        'bomba'
    );

    return (
        getPromoItems(
            getSource({ imageID, noteID, imageConfig, isHideImage })
        ) || []
    );
};

const getMediaApertura = (renderables, arcSite, isAdmin) => {
    const apertura =
        (renderables.length &&
            getChildsFromSections(
                get(sectionsValidation, 'Apertura_1.position', 3) + 1,
                renderables
            ).filter(
                element =>
                    get(element, 'props.customFields.hideCaja', false) !==
                        true && get(element, 'type', null) === 'Ln_Caja_Manual'
            )[0]) ||
        [];

    const article = get(apertura, 'children', [])[0];

    const { isHideImage, imageID, noteID, videoID } = getcustomFieldsData(
        article
    );

    const diagramacion = get(apertura, 'props.customFields.layout', '');

    const imageConfig = get(
        getProperties(arcSite),
        `cajaTemaConfig.${diagramacion}.articles[0].imageConfig`,
        ''
    );

    return (
        getPromoItems(
            getSource({
                imageID,
                noteID,
                imageConfig,
                isHideImage,
                videoID,
                isAdmin
            })
        ) || []
    );
};

const GetDataToLinkImage = ({
    data = {},
    section = '',
    renderables = [],
    arcSite = '',
    isAdmin = false
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

    const basic = replaceUrlResizerToWWW(get(data, 'promo_items.basic', {}));
    const isAuthor = nodeType === 'author';

    if (!data) return <></>;

    const sectionData = {
        Nota: () => {
            const resizedUrls =
                subtype === STORYTELLING
                    ? replaceAllUrlsResizerArray(
                          get(
                              promoItems,
                              'storytelling_mobile.resized_urls',
                              []
                          )
                      )
                    : get(basic, 'resized_urls', []);

            return <LinkImagePreload resizedUrls={resizedUrls} />;
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
            const idCollectionApertura = getIdCollectionFromGC(data);

            if (
                !hasFeatureAcumuladoApertura ||
                (!idCollectionApertura && hasChainBeforeGrid)
            )
                return <></>;

            const dataPreloadAcu = getDataPreloadAcu(
                idCollectionApertura,
                nodeType
            );
            return (
                <ImagePreloadlAcu
                    {...dataPreloadAcu}
                    arcSite={arcSite}
                    accumulated={{ id, canonicalUrl, name }}
                />
            );
        },

        Home: () => {
            const bomba =
                (renderables.length &&
                    getChildsFromSections(
                        get(sectionsValidation, 'Bomba.position', 2) + 1,
                        renderables
                    ).filter(
                        element =>
                            get(
                                element,
                                'props.customFields.hideFeature',
                                false
                            ) !== true &&
                            get(
                                element,
                                'props.customFields.hideImage',
                                false
                            ) !== true &&
                            get(element, 'type', null) === 'LN-common/bomba'
                    )) ||
                [];

            const resizedUrls = bomba.length
                ? getMediaBomba(arcSite, bomba)
                : getMediaApertura(renderables, arcSite, isAdmin);

            return Array.isArray(resizedUrls) && resizedUrls.length > 0 ? (
                <LinkImagePreload resizedUrls={resizedUrls} />
            ) : (
                <></>
            );
        }
    } || <></>;

    const sectionAsComponent = capitalizeFirstLetter(section);

    return (
        (sectionData[sectionAsComponent] &&
            sectionData[sectionAsComponent]()) || <></>
    );
};

export default GetDataToLinkImage;
