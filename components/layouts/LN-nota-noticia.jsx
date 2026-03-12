import React from 'react';
import Consumer from 'fusion:consumer';
import classNames from 'classnames';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import NotaMain from '../private/common/layouts/notaMain';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import InitControlGroup from './helpers/initCtrlGrp';

import '../../resources/dist/css/ln/base/helpers.css';
import '../../resources/packages/css/@ln/contenidos-ui-sass/index.css';
import '../../resources/dist/css/ln/pages/magazine.css';

function lnNotaNoticia({
    children,
    layout,
    globalContent: {
        taxonomy: { sections },
        distributor = { name: 'LA NACION' }
    }
}) {
    const { name = 'LA NACION' } = distributor;
    const bannerMegatop = children[0];
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';

    const classNameNotaMain = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'noticia',
        magazine
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <NotaMain className={classNameNotaMain}>{children}</NotaMain>
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

lnNotaNoticia.sections = pageBuilderSections;

export default Consumer(lnNotaNoticia);
