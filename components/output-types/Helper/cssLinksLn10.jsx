/* eslint-disable react/prop-types */
import React from 'react';
import CssLinksByArcSite from './cssLinksByArcSite';

const CssLinksLn10 = props => {
    const { CssLinks, isLN10, arcSite } = props;
    if (arcSite === 'la-nacion-ar' && isLN10) return <></>;
    if (arcSite !== 'la-nacion-ar') {
        return <CssLinksByArcSite />;
    }
    return <CssLinks />;
};
export default CssLinksLn10;
