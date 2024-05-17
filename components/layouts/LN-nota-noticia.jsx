/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import '../../resources/dist/css/ln/pages/magazine.css';
import GlobalProvider from '../private/common/context/globalContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';
import NotaMain from '../private/common/layouts/notaMain';
import intersectionObserverForRelatedTags from '../private/common/utils/relatedTagTracker';

import '../../resources/dist/css/ln/base/helpers.css';
import '../../resources/packages/css/@ln/contenidos-ui-sass/index.css';

const lnNotaNoticia = ({
    children,
    outputType,
    tree,
    isAdmin,
    layout,
    globalContent: {
        taxonomy: { sections },
        distributor = { name: 'LA NACION' }
    }
}) => {
    const { name = 'LA NACION' } = distributor;
    const amp = outputType === 'amp' ? 'amp' : '';
    const bannerMegatop = getBannerMegatop(children[0], amp, tree, isAdmin);
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';

    const classNameNotaMain = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'noticia',
        magazine,
        amp
    );

    return (
        <GlobalProvider>
            {bannerMegatop}
            <NotaMain className={classNameNotaMain}>{children}</NotaMain>
            <LoadBannersSSR />
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

lnNotaNoticia.sections = pageBuilderSections;

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    outputType: PropTypes.string,
    tree: PropTypes.shape(PropTypes.arrayOf(PropTypes.node)),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.shape())
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }),
    layout: PropTypes.string
};

export default Consumer(lnNotaNoticia);
