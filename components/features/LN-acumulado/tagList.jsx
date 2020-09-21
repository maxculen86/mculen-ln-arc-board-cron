import React from 'react';
import TagsNavigation from '../../private/LN/acumulado/tagsNavigation';
import withStatic from '../../private/common/hocs/withStatic';

const TagsListFeature = props => {
    return <TagsNavigation {...props} />;
};

TagsListFeature.label = 'LN-Acumulado-Tag-List';

export default withStatic(TagsListFeature);
