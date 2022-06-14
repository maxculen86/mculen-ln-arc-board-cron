import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent as getContent } from 'fusion:content';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import ComLinkList from '../../private/common/com-link-list';
import get from '../../private/common/utils/get';
import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../private/common/utils/tags';
import getSectionName from '../../private/LN/common/utils/getSectionName';
import ComTitle from '../../private/common/com-title';
import { sectionsFormated } from './ultimasNoticias';

export const getUltimasNoticiasSectionsIds = renderables => {
    const ultimasNoticiasFeature = renderables.find(
        element => get(element, 'type', '') === 'LN-acumulado/ultimasNoticias'
    );
    return sectionsFormated(
        get(ultimasNoticiasFeature, 'props.customFields.sections', [])
    );
};

const TagsListFeature = ({ id, title }) => {
    const {
        globalContent: { _id: sectionId, node_type: nodeType, type } = {},
        renderables = [],
        arcSite = 'la-nacion-ar'
    } = useAppContext() || {};

    const {
        acumuladoGeneral: { hidetagslist = false } = {},
        acumuladoColor: { navigation_color_tags: colorTags } = {}
    } = useGlobalProviderAcu() || {};
    const sectionIsHome =
        getSectionName({ nodeType, type, arcSite }) === 'home';

    const [articlesInCache] = useState(
        (typeof window !== 'undefined' &&
            get(window, 'Fusion.contentCache.articleSourceNota', [])) ||
            []
    );
    const [articlesInHome, setArticlesInHome] = useState(
        (sectionIsHome &&
            Object.entries(articlesInCache).map(
                ([key, value]) => value.data
            )) ||
            []
    );

    const ultimasNoticiasQueryProps =
        sectionId === '/ultimas-noticias'
            ? {
                  sectionsIds: getUltimasNoticiasSectionsIds(renderables),
                  sourceOrigin: 'composer'
              }
            : {
                  sectionsIds: undefined,
                  sourceOrigin: undefined
              };

    useEffect(() => {
        setArticlesInHome(
            (sectionIsHome &&
                Object.entries(articlesInCache).map(
                    ([key, value]) => value.data
                )) ||
                []
        );
    }, [articlesInCache, sectionIsHome]);

    const orderAndCountTags = sectionIsHome
        ? getOrderAndCountTags(articlesInHome)
        : getContent({
              sourceName: 'acuArticlesSource',
              query: {
                  website: arcSite,
                  sectionId,
                  page: 0,
                  promoItemsOnly: false,
                  ...ultimasNoticiasQueryProps
              },
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
              transform: data => {
                  return getOrderAndCountTags(
                      get(data, 'content_elements', [])
                  );
              }
          });

    const tagList = transformTagsForAcu(orderAndCountTags, colorTags);
    const Component = (hidetagslist !== 'true' && tagList.length && (
        <>
            {title && <ComTitle size="--twoxs" content={title} />}
            <ComLinkList
                list={tagList}
                extraClass="--tags"
                isHome={sectionIsHome}
            />
        </>
    )) || <></>;

    return sectionIsHome ? Component : <Static id={id}>{Component}</Static>;
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

TagsListFeature.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string
};

TagsListFeature.defaultProps = {
    title: ''
};

export default TagsListFeature;
