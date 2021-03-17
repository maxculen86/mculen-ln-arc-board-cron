import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import LoginProvider from '../private/LN/common/context/loginContext';
import Modshare from '../private/common/mod-share';

import '../../resources/dist/css/ln/base.css'; // chequear para sacar base porque se repite estilo
import '../../resources/dist/css/ln/base/reset.css';
import '../../resources/dist/css/ln/base/types.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/layouts/layout.css';

import '../../resources/dist/css/ln/pages/photo100.css';

import AperturaStorytelling from '../private/LN/nota/apertura/AperturaStorytelling';

// TODO, REVISAR ESTOS ESTILOS MAS ADELANTE. EN ALGUNOS LADOS FUNCIONAN EN
// EL COMPONENTE Y EN OTROS NO
import '../../resources/dist/css/ln/components/date.css';
import '../../resources/dist/css/ln/components/author.css';
import '../../resources/dist/css/ln/components/text.css';

import '../../resources/dist/css/ln/components/button.css';
import '../../resources/dist/css/ln/components/tag.css';
import '../../resources/dist/css/ln/components/lead.css';
import '../../resources/dist/css/ln/components/com-ordered.css';
import '../../resources/dist/css/ln/components/com-unordered.css';
import '../../resources/dist/css/ln/components/input.css';
import '../../resources/dist/css/ln/modules/newsletter.css';
import '../../resources/dist/css/ln/components/blockquote.css';
import '../../resources/dist/css/ln/components/link.css';
import '../../resources/dist/css/ln/components/subtitle.css';
import '../../resources/dist/css/ln/components/slider.css';
import '../../resources/dist/css/ln/components/epigraph.css';
import '../../resources/dist/css/ln/components/appointment.css';
import '../../resources/dist/css/ln/components/opinion-author.css';

import '../../resources/dist/css/ln/modules/mod-banner.css';
import '../../resources/dist/css/ln/components/com-banner.css';
import '../../resources/dist/css/ln/components/com-button.css';

/* Se debe importar para AMP */
// import '../../resources/dist/css/ln/components/nav-amp.css';

/* Se debe importar por layouts */
import '../../resources/dist/css/ln/components/banners.css';

/* Se debe dejar último los helpers */
import '../../resources/dist/css/ln/base/helpers.css';

import '../../resources/dist/css/ln/pages/magazine.css';

import GlobalProvider from '../private/common/context/globalContext';
import { CommentsProvider } from '../private/common/context/commentsContext';
import { getSectionLogo } from '../private/common/utils/sectionUtils';
import LoadBanners from '../private/common/banners/LoadBanners';

const getBannerMegatop = (element, outputType, tree, isAdmin) => {
    const { children } = tree;
    // children[0] => Section BannerMegatop
    const { children: childrenSectionBannerMegatop } = children[0];
    const isValid =
        outputType !== 'amp' && childrenSectionBannerMegatop.length <= 1;
    const component = isValid ? (
        element
    ) : (
        <PageBuilderMessage
            id="LN-nota-foto-al-100-error"
            type="warning"
            message="La sección BannerMegatop solo permite un banner y no se mostrará en salida AMP"
        />
    );
    if (isAdmin) return component;
    return isValid ? component : null;
};

// if CATEGORIA REVISTA

const lnNotaFotoAl100 = ({
    children: [
        bannerMegatop,
        leftCuerpo,
        cuerpo,
        postCuerpo,
        postCuerpoTercera,
        newsletter,
        bottom,
        bottomTercera
    ],
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
    const logo = getSectionLogo(sections, layout, name);
    const magazine = logo ? logo.logoName : '';
    return (
        <GlobalProvider>
            <LoginProvider>
                <CommentsProvider>
                    {/* Banner MEGATOP */}
                    {getBannerMegatop(bannerMegatop, amp, tree, isAdmin)}

                    <div
                        id="wrapper"
                        className={`nota ${magazine} --photo100 --transparent ${amp}`}
                    >
                        <Header />
                        <main>
                            <AperturaStorytelling />

                            {/* Cuerpo al 100% */}
                            <div className="row">
                                {leftCuerpo}
                                <Modshare classCondition="--block" />
                                {cuerpo}
                            </div>

                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* Post-Cuerpo */}
                                    {postCuerpo}
                                </div>
                                <div className="sidebar__aside hlp-tablet-none">
                                    {/* Post-Cuerpo-Tercera */}
                                    {postCuerpoTercera}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="lay">{newsletter}</div>

                            <div className="lay-sidebar">
                                <div className="sidebar__main">
                                    {/* Bottom */}
                                    {bottom}
                                </div>
                                <div className="sidebar__aside hlp-tablet-none">
                                    {/* Bottom-Tercera */}
                                    {bottomTercera}
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                    <LoadBanners />
                </CommentsProvider>
            </LoginProvider>
        </GlobalProvider>
    );
};

const pageBuilderSections = [
    'Banner-Megatop',
    'Left-Cuerpo',
    'Cuerpo',
    'Post-Cuerpo',
    'Post-Cuerpo-Tercera',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

lnNotaFotoAl100.sections = pageBuilderSections;

lnNotaFotoAl100.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            sections: PropTypes.shape({
                _id: PropTypes.string
            })
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(lnNotaFotoAl100);
