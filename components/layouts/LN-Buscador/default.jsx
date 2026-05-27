import React from 'react';
import Consumer from 'fusion:consumer';
import GlobalProvider from '../../private/common/context/globalContext';
import BaseLayout from '../../features/LN/common/baseLayout/default';
import Search from './_children/default';
import FilterDrawer from './_children/FilterDrawer';
import getQueryParamValue from '../../private/common/utils/getQueryParamValue';
import createTagsTitleAndMetas from '../../private/common/utils/lnBuscadorHelper';

function LnSearch({
    metaValue,
    siteProperties: { description } = {},
    children
}) {
    let searchResults = '';

    if (typeof window !== 'undefined') {
        searchResults = getQueryParamValue('query', window.location.href);
        createTagsTitleAndMetas(
            metaValue('description') || description,
            window.location.href,
            searchResults
        );
    }

    return (
        <GlobalProvider>
            <BaseLayout>
                <Search />
                {children[0]}
                <FilterDrawer />
            </BaseLayout>
        </GlobalProvider>
    );
}

LnSearch.sections = ['Bloque-1'];
LnSearch.label = 'LN-Queryly-Buscador';

export default Consumer(LnSearch);
