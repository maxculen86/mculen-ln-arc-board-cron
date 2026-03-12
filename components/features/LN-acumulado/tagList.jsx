/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent as getContent } from 'fusion:content';
import Static from 'fusion:static';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import ComLinkList from '../../private/common/com-link-list';
import get from '../../private/common/utils/get';
import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../private/common/utils/tags';
import getSectionName from '../../private/LN/common/utils/getSectionName';
import ComTitle from '../../private/common/com-title';
import sectionsFormated from '../../private/common/utils/sectionsFormated';

export const getUltimasNoticiasSectionsIds = renderables => {
    const ultimasNoticiasFeature = renderables.find(
        element => get(element, 'type', '') === 'LN-acumulado/ultimasNoticias'
    );
    return sectionsFormated(
        get(ultimasNoticiasFeature, 'props.customFields.sections', [])
    );
};

const getUltimasNoticiasProps = ({ sectionId, renderables = [] }) =>
    sectionId === '/ultimas-noticias'
        ? {
              sectionsIds: getUltimasNoticiasSectionsIds(renderables),
              sourceOrigin: 'composer'
          }
        : {
              sectionsIds: undefined,
              sourceOrigin: undefined
          };

export const getSectionProps = ({
    sectionName,
    sectionId,
    renderables,
    arcSite
}) => {
    const ultimasNoticiasQueryProps = getUltimasNoticiasProps({
        sectionId,
        renderables
    });

    const configForSection = {
        default: {
            sourceName: 'acuArticlesSourceV2',
            query: {
                website: arcSite,
                sectionId,
                page: 0,
                promoItemsOnly: false,
                ...ultimasNoticiasQueryProps
            }
        }
    };

    return configForSection[sectionName] || configForSection.default;
};

function TagsListFeature({ id: featureId, title }) {
    const {
        globalContent: { _id: sectionId, node_type: nodeType, type } = {},
        renderables = [],
        arcSite = 'la-nacion-ar'
    } = useAppContext() || {};

    const {
        acumuladoGeneral: { hidetagslist = false } = {},
        acumuladoColor: { navigation_color_tags: colorTags } = {}
    } = useGlobalProviderAcu() || {};

    const sectionName = getSectionName({ nodeType, type });
    const sectionIsHome = sectionName === 'home';

    const { sourceName, query } = getSectionProps({
        sectionName,
        sectionId,
        arcSite,
        renderables
    });

    const orderAndCountTags = getContent({
        sourceName,
        query,
        staticMode: true,
        filter: `{
                content_elements {
                    taxonomy {
                        tags {
                            text
                            slug
                        }
                    }
                }
            }`,
        transform: data =>
            getOrderAndCountTags(get(data, 'content_elements', []))
    });

    const tagList = transformTagsForAcu(orderAndCountTags, colorTags);
    const Component =
        (hidetagslist !== 'true' && tagList.length && (
            <>
                {title && <ComTitle size="--twoxs" content={title} />}
                <ComLinkList
                    list={tagList}
                    extraClass="--tags"
                    isHome={sectionIsHome}
                />
            </>
        )) ||
        null;

    return <Static id={featureId}>{Component}</Static>;
}

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default TagsListFeature;
