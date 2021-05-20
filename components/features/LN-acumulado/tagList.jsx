import React, { useContext, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent as getContent } from 'fusion:content';
import Static from 'fusion:static';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import { GlobalContext } from '../../private/common/context/globalContext';
import ComLinkList from '../../private/common/com-link-list';
import get from '../../private/common/utils/get';
import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../private/common/utils/tags';
import getSectionName from '../../private/LN/common/utils/getSectionName';

const TagsListFeature = ({ id }) => {
    const {
        globalContent: { _id: sectionId, node_type: nodeType, type } = {},
        arcSite = 'la-nacion-ar'
    } = useAppContext() || {};
    const sectionIsHome = getSectionName({ nodeType, type }) === 'home';
    const { state } = useContext(GlobalContext);
    const {
        acumuladoGeneral: { hidetagslist = false } = {},
        acumuladoColor: { navigation_color_tags: colorTags } = {}
    } = useGlobalProviderAcu() || {};

    const orderAndCountTags = sectionIsHome
        ? getOrderAndCountTags(get(state, 'tagsHome', []))
        : getContent({
              sourceName: 'acuArticlesSource',
              query: {
                  website: arcSite,
                  sectionId,
                  page: 0,
                  promoItemsOnly: false
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

    useEffect(() => {
        const tagsHome = get(state, 'tagsHome', []);
    }, [state]);

    const Component =
        (hidetagslist !== 'true' && tagList && (
            <ComLinkList list={tagList} extraClass="--tags" />
        )) ||
        null;

    return sectionIsHome ? Component : <Static id={id}>{Component}</Static>;
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default TagsListFeature;
