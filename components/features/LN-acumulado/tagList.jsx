import React from 'react';
import { useAppContext } from 'fusion:context';
import TagsNavigation from '../../private/LN/acumulado/tagsNavigation';
import withStatic from '../../private/common/hocs/withStatic';
// TODO: Agregar HOC withStatic luego de refactorizar withAcuArticlesData
const TagsListFeature = props => {
    const {
        globalContent: { _id: sectionId }
    } = useAppContext() || {};

    return <TagsNavigation {...props} sectionId={sectionId} />;
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default withStatic(TagsListFeature);
