import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import ComLinkList from '../../private/common/com-link-list';
import withStatic from '../../private/common/hocs/withStatic';
import get from '../../private/common/utils/get';
import {
    getOrderAndCountTags,
    transformTagsForAcu
} from '../../private/common/utils/tags';

const TagsListFeature = () => {
    const { globalContent: { _id: sectionId } = {}, arcSite = 'la-nacion-ar' } =
        useAppContext() || {};

    const {
        acumuladoGeneral: { hidetagslist = false } = {},
        acumuladoColor: { navigation_color_tags: colorTags } = {}
    } = useGlobalProviderAcu() || {};

    const orderAndCountTags = useContent({
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
            return getOrderAndCountTags(get(data, 'content_elements', []));
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
