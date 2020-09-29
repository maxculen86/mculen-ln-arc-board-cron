import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

import get from '../../../common/utils/get';

const withAcuCategories = (WrappedComponent, filter, website) => props => {
    const idPrimarySection = get(props, 'globalContent._id', undefined);

    const isPrimarySection =
        idPrimarySection && idPrimarySection.split('/').splice(1).length === 1;

    const _children = get(props, 'globalContent.children', undefined);

    const hidesectionslist = get(
        props,
        'globalContent.site.hidesectionslist',
        undefined
    );

    const hierarchyManual = get(
        props,
        'globalContent.acumuladoGeneral.hierarchy_navigation',
        undefined
    );

    const navigationList = useContent({
        source: 'navigationSource',
        query: {
            hierarchy: hierarchyManual,
            website
        },
        filter
    });

    const response = get(navigationList, 'children', null);

    const navigation = (response && response.length && response) || _children;

    return (
        <WrappedComponent
            {...props}
            isPrimarySection={isPrimarySection}
            navigation={
                (hidesectionslist === 'false' ||
                    hidesectionslist === undefined) &&
                isPrimarySection &&
                navigation
            }
        />
    );
};

withAcuCategories.propTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
};

export default withAcuCategories;
