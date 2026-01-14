import React from 'react';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';
import config from '../../../properties/sites/la-nacion-ar';

function CssLinksLn10(props) {
    const { CssLinks, globalContent, layout } = props;

    const {
        layoutsName: { NotaOpinion, HomeLN10 }
    } = config;

    const excludedLayouts = [
        { pageLayout: NotaOpinion },
        { pageLayout: HomeLN10 }
    ];

    const shouldExcludeCssLinks = isAllowedSection({
        globalContent,
        listOfAllowedSection: excludedLayouts,
        layout
    });

    if (shouldExcludeCssLinks) return null;

    return <CssLinks />;
}
export default CssLinksLn10;
