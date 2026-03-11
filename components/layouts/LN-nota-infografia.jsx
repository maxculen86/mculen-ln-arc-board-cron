import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import NotaMain from '../private/common/layouts/notaMain';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import InitControlGroup from './helpers/initCtrlGrp';

function lnNotaInfografia({
    children,
    outputType,
    globalContent: {
        taxonomy: { sections },
        distributor: { name }
    },
    layout
}) {
    const bannerMegatop = children[0];
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';

    const classNameNotaMain = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        '--info',
        magazine
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <NotaMain className={classNameNotaMain} outputType={outputType}>
                {children}
            </NotaMain>
            <LoadBannersSSR />
            <PwaModal />
            <InitControlGroup />
        </GlobalProvider>
    );
}

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

export default Consumer(lnNotaInfografia);
