/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import PwaModals from '../private/LN/common/pwaModals';
import NotaMain from '../private/common/layouts/notaMain';

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
    return (
        <GlobalProvider>
            {bannerMegatop}
            <div id="wrapper" className={`nota --info ${magazine} ${amp}`}>
                <NotaMain>{children}</NotaMain>
            </div>
            <LoadBannersSSR />
            <PwaModals />
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
