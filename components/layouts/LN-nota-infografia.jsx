/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';
import NotaMain from '../private/common/layouts/notaMain';

import intersectionObserverForRelatedTags from '../private/common/utils/relatedTagTracker';

const lnNotaInfografia = ({
    children,
    outputType,
    tree,
    isAdmin,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';

    const classNameNotaMain = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        '--info',
        magazine,
        amp
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <NotaMain className={classNameNotaMain} outputType={outputType}>
                {children}
            </NotaMain>
            <LoadBannersSSR />
            <PwaModals />
            {intersectionObserverForRelatedTags(outputType)}
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Pos-Cuerpo',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaInfografia.sections = pageBuilderSections;

lnNotaInfografia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    tree: PropTypes.shape(PropTypes.node),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string
                })
            )
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }),
    layout: PropTypes.string
};

export default Consumer(lnNotaInfografia);
