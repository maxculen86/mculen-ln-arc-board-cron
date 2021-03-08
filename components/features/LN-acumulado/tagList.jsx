import React from 'react';
import { useAppContext } from 'fusion:context';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import TagsNavigation from '../../private/LN/acumulado/tagsNavigation';
import withStatic from '../../private/common/hocs/withStatic';
// TODO: Agregar HOC withStatic luego de refactorizar withAcuArticlesData
const TagsListFeature = props => {
    const { acumuladoGeneral, acumuladoColor } = useGlobalProviderAcu();
    const { hidetagslist = 'false' } = acumuladoGeneral;
    const { navigation_color_tags: colorTags } = acumuladoColor;
    const {
        globalContent: { _id: sectionId }
    } = useAppContext() || {};

    if (hidetagslist === 'true') return null;

    return (
        <TagsNavigation
            {...props}
            sectionId={sectionId}
            colorTags={colorTags}
            hidetagslist={hidetagslist}
        />
    );
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default withStatic(TagsListFeature);
