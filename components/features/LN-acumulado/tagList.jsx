import React, { useState, useContext } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent as getContent } from 'fusion:content';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import { GlobalContext } from '../../private/common/context/globalContext';
import ComLinkList from '../../private/common/com-link-list';
import withStatic from '../../private/common/hocs/withStatic';
import get from '../../private/common/utils/get';
import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../private/common/utils/tags';
import getSectionName from '../../private/LN/common/utils/getSectionName';

const TagsListFeature = () => {
    const {
        globalContent: { _id: sectionId, node_type: nodeType, type } = {},
        arcSite = 'la-nacion-ar'
    } = useAppContext() || {};
    const { state = {} } = useContext(GlobalContext);
    const { tagsHome = [] } = state;

    const _nodeType = getSectionName({ nodeType, type });

    const {
        acumuladoGeneral: { hidetagslist = false } = {},
        acumuladoColor: { navigation_color_tags: colorTags } = {}
    } = useGlobalProviderAcu() || {};

    const orderAndCountTags =
        _nodeType === 'home'
            ? getOrderAndCountTags(tagsHome)
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

    const [tagList] = useState(
        transformTagsForAcu(orderAndCountTags, colorTags)
    );

    return (
        (hidetagslist !== 'true' && tagList && (
            <ComLinkList list={tagList} extraClass="--tags" />
        )) ||
        null
    );
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default withStatic(TagsListFeature);
